# API
import os
import json
import logging
import requests
import pdfkit

import flask
from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS
from dotenv import load_dotenv
from flask_api import status
from flask import redirect, render_template, request, send_file, session, url_for

from jsonschema import validate, ValidationError
from ibm_watson import AssistantV2, ApiException
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from flask import jsonify

import pymongo
from bson import json_util, ObjectId

from twilio.rest import Client

import time

load_dotenv()

app = Flask(__name__)
api = Api(app)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

assistant_api_key = os.getenv("assistant_api_key")
assistant_url = os.getenv("assistant_url")
assistant_version = os.getenv("assistant_version")
assistant_id = os.getenv("assistant_id")


global_text = ''
uri = os.getenv("uri")
account_sid = os.getenv("account_sid")
auth_token = os.getenv("auth_token")
wa_session_id = os.getenv("session_id")

request_data = {
            "assistant_api_key": assistant_api_key,
            "assistant_url": assistant_url,
            "assistant_version": assistant_version,
            "assistant_id": assistant_id
        }


def watson_create_session():
    iam_apikey = request_data.get("assistant_api_key")
    assistant_url = request_data.get("assistant_url")
    assistant_version = request_data.get('assistant_version')

    assistant = watson_instance(iam_apikey, assistant_url, assistant_version)

    try:
        watson_session = assistant.create_session(
            assistant_id=request_data.get("assistant_id"),
            context={
                'skills': {
                    'main skill': {
                        'user_defined': {
                            'cpu': '',
                            'ram':'',
                            'storage':'',
                            'graphics':'',
                            'case':''
                        }
                    }
                }
            }
        ).get_result()
        watson_session_id = watson_session["session_id"]
    except KeyError:
        _logger.error("The session wasn't created")
        return jsonify({"error": "Error creating the session"}), status.HTTP_503_SERVICE_UNAVAILABLE

    return watson_session_id


def watson_response(watson_session_id,message, channel):
    
    iam_apikey = request_data.get("assistant_api_key")
    assistant_url = request_data.get("assistant_url")
    assistant_version = request_data.get('assistant_version')

    assistant = watson_instance(iam_apikey, assistant_url, assistant_version)
    #context = request_data.get('context') if 'context' in request_data else {}

    try:
        watson_response = assistant.message(
            assistant_id=request_data.get('assistant_id'),
            session_id=watson_session_id,
            input={
                'message_type': 'text',
                'text': message,
                'options': {
                    'return_context': True
                }
            },
            context={
                'skills': {
                    'main skill': {
                        'user_defined': {
                            'channel': channel
                        }
                    }
                }
            },
        ).get_result()
    except ValueError as ex:
        _logger.error("Value error: %s", ex)
        return jsonify({'error': "Value error"}), status.HTTP_500_INTERNAL_SERVER_ERROR
    except ApiException:
        try:
            watson_session = assistant.create_session(
                assistant_id=request_data.get("assistant_id")
            ).get_result()
            watson_session_id = watson_session["session_id"]
            watson_response = assistant.message(
                assistant_id=request_data.get('assistant_id'),
                session_id=watson_session_id,
                input={
                    'message_type': 'text',
                    'text': request_data.get('input_message'),
                    'options': {
                        'return_context': True
                    }
                },
                context=context
            ).get_result()
        except KeyError:
            _logger.error("The session wasn't created")
            return jsonify({"error": "Error creating the session"}), status.HTTP_503_SERVICE_UNAVAILABLE

    try:
        del watson_response["context"]["global"]["session_id"]
    except:
        pass

    
    response = {
        "id":watson_response["output"]["generic"][0]["text"],
        "session_id": watson_session_id,
        "context":watson_response["context"]["skills"]["main skill"]["user_defined"]
    }
    
    return response

def watson_instance(iam_apikey: str, url: str, version: str = "2020-08-31") -> AssistantV2:
    try:
        authenticator = IAMAuthenticator(iam_apikey)
        assistant = AssistantV2(
            authenticator=authenticator,
            version=version
        )
        assistant.set_service_url(url)
    except ApiException as error:
        _logger.error("%s - %s", error.code, error.message)
        return jsonify({'error': str(error.message)}), error.code

    return assistant


def connect_db():
    client = pymongo.MongoClient(uri)
    return client


def exit_db(client):
    client.close


def write_intent(client, post):
    db = client.LabWeb 
    collection = db.requests
    intent_insertion = collection.insert_one(post)

    return intent_insertion


def get_intent_response(client, intent):
    db = client.LabWeb
    collection = db.responses
    intent_response = collection.find_one({"id" : intent})

    if(intent_response):
        mongoQuery = intent_response["response"]
    else:
        mongoQuery = [{
                        "type":"text",
                        "text":"Lo siento, no encontre un mensaje"
                    }]

    return mongoQuery

def addItemToUserCart(client, user_id, item_id):
    db = client.LabWeb
    collection = db.users
    products = db.products

    added = False

    product = products.find_one({"_id" : ObjectId(item_id)})
    user = collection.find_one({"_id" : user_id})

    total = user['total'] + product['price']

    try:
        response = collection.update_one({"_id" : user_id}, {'$push': {'cart': product},"$set": { 'total': total }})

        print(response.matched_count)

        if response.matched_count >= 1:
            added = True
    
    except Exception as e:
        print(e)
    

    mongoQuery = [{
                    "added":added,
                  }]
        
    return mongoQuery

def removeItemFromUserCart(client, user_id, item_id):
    db = client.LabWeb
    collection = db.users
    products = db.products

    remove = False

    product = products.find_one({"_id" : ObjectId(item_id)})
    user = collection.find_one({"_id" : user_id})

    total = user['total'] - product['price']

    try:
        response = collection.update_one({"_id" : user_id}, {'$pull': { 'cart': { "_id": ObjectId(item_id) } },"$set": { 'total': total }})

        print(response.matched_count)

        if response.matched_count >= 1:
            remove = True
    
    except Exception as e:
        print(e)
    

    mongoQuery = [{
                    "remove":remove,
                  }]
        
    return mongoQuery
    

def parse_json(data):
    return json.loads(json_util.dumps(data))

def getUserCart(client, user_id):
    db = client.LabWeb
    collection = db.users

    mongoQuery = {}

    try:
        user = collection.find_one({"_id" : user_id})
        new_user = parse_json(user)
        mongoQuery = {
            "cart":new_user['cart'],
            "total":new_user['total']
        }
    except Exception as e:
        print(e)

        
    return mongoQuery

def getWACart(client,context):

    db = client.LabWeb
    products = db.products

    product_context = [ObjectId(context["cpu"]),ObjectId(context["ram"]),ObjectId(context["storage"]),ObjectId(context["graphics"]),ObjectId(context["case"])]

    product_json = products.find({"_id" : {"$in": product_context}})

    return parse_json(product_json)
    

def getClient():
    wa_client = Client(account_sid, auth_token)
    return wa_client


def obtainLastMessage(wa_client):
    messages = wa_client.messages.list(limit=2)
    last_message = messages[0].body
    return last_message


def createHTML():
    f = open("catalog.html", "w")
    text = '''<!DOCTYPE html>
    <html>
        <body>
            <h1>Catalogo</h1>
    '''
    f.write(text)
    f.close()


def addImages(products):
    f = open("catalog.html", "a")

    text = '''
                <h1>Catalogo</h1>
                    <table>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
    '''

    f.write(text)

    total = 0

    link = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.qr-code-generator.com%2F&psig=AOvVaw1ZE0NRyXjZoCu891RlbdXQ&ust=1606528704692000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOi4pfnPoe0CFQAAAAAdAAAAABAD"

    for p in products:
        total += p["price"]
        row = '''
                        <tr>
                            <td>
                                <img src={} alt="Catalog Image" width="500" height="600">
                            </td>
                            <td>{}</td>
                            <td>{}</td>
                        </tr>
        '''.format(p["image"],p["name"],p["price"])

        f.write(row)


    text_2 = '''
                    </table>
                    <h1>Total: {}</h1>
                    <img src={} alt="Catalog Image" width="500" height="600">
        </body>\n</html>
    '''.format(total,link)

    f.write(text_2)
    f.close()


def writePDF(wa_client,products):
    createHTML()
    addImages(products)
    pdfkit.from_file("catalog.html", "carrito.pdf")
    wa_client = getClient()
    response = wa_client.messages.create( 
                              from_='whatsapp:+14155238886',  
                              body= "Este es nuestro catalogo!!!",
                              media_url=['http://266e59f64bf7.ngrok.io/pdf'],
                              to='whatsapp:+5215548885790' 
                          )


def respondWA(wa_client, query):
    response = wa_client.messages.create( 
                              from_='whatsapp:+14155238886',  
                              body= query,
                              to='whatsapp:+5215548885790' 
                          )
    return response


def respondWACatalog(cliente, wa_client):
    db = cliente.LabWeb
    collection = db.products
    #intent_response = collection.find_one({"id" : intent})
    cont = 0
    for x in collection.find():
        if cont == 10:
            break
        response = wa_client.messages.create( 
                        from_='whatsapp:+14155238886',  
                        body= x['name'],
                        media_url=x['image'],
                        to='whatsapp:+5215548885790' 
                    )
        cont += 1


def respondWABuildPC(client, wa_client, query, context):
    print(query)
    # Show to the user the options
    question = query[0]["text"]
    print(query[0]["text"])
    response = wa_client.messages.create( 
                              from_='whatsapp:+14155238886',  
                              body= question,
                              to='whatsapp:+5215548885790' 
                          )
    if len(query) > 1:
        if query[1]["type"] == 'option':
            options = query[1]["options"]
            for i in options:
                print(i["name"])
                response = wa_client.messages.create( 
                                from_='whatsapp:+14155238886',  
                                body= i["name"],
                                to='whatsapp:+5215548885790' 
                            )
        elif query[1]["type"] == 'carousel':
            options = query[1]["options"]
            print(options)
            for i in options:
                print(i["name"])
                response = wa_client.messages.create( 
                                from_='whatsapp:+14155238886',  
                                body= i["name"],
                                media_url=i['image'],
                                to='whatsapp:+5215548885790' 
                            )
                time.sleep(1)
    else:
        print("Mandar carrito en un pdf")
        products = getWACart(client,context)
        writePDF(wa_client,products)


class CREATE_SESSION(Resource):
    def get(self):
        return watson_create_session()


class PDF(Resource):
    def get(self):
        filename = 'carrito.pdf'
        return send_file(filename, mimetype='application/pdf')


class GET_MESSAGE(Resource):
    def post(self):
        cliente = connect_db()

        #Get the watson session id and message from the user request
        watson_session_id = request.json["sessionId"]
        global_text = request.json["message"]
        
        response = watson_response(watson_session_id,global_text, "web")
       
        intent = response["id"] ## Esto lo mandamos a mongo
        '''
        message = global_text
        
        post = {
            "intent" : intent,
            "message" : message
        }'''

        #insertar_intent = write_intent(cliente, post)
        
        intent_response = get_intent_response(cliente, intent)
    
        exit_db(cliente)

        return jsonify(response=intent_response)

class ADD_ITEM_TO_CART(Resource):
    def post(self):
        cliente = connect_db()

        #Get the item id and user id from the user request
        item_id = request.json["itemId"]
        user_id = request.json["userId"]

        
        intent_response = addItemToUserCart(cliente, user_id ,item_id)
    
        exit_db(cliente)

        return intent_response

class REMOVE_ITEM_TO_CART(Resource):
    def post(self):
        cliente = connect_db()

        #Get the item id and user id from the user request
        item_id = request.json["itemId"]
        user_id = request.json["userId"]

        
        intent_response = removeItemFromUserCart(cliente, user_id ,item_id)
    
        exit_db(cliente)

        return intent_response

class GET_CART(Resource):
    def post(self):
        cliente = connect_db()

        #Get the user id from the user request
        user_id = request.json["userId"]

        
        response = getUserCart(cliente, user_id)
    
        exit_db(cliente)

        return response

class GET_WHATSAPP_MESSAGE(Resource):
    def post(self):
        # Connect to the mongodb
        cliente = connect_db()
        # Create a session for watson
        watson_session_id = wa_session_id  # Create the static session for WA
        # Create whatsapp client
        wa_client = getClient()

        wa_message = obtainLastMessage(wa_client)

        response = watson_response(watson_session_id, wa_message, "whatsapp")
        
        intent = response["id"]
        intent_response = ''
        if intent == "products":
            respondWACatalog(cliente, wa_client)
        elif intent == "anything_else":
            intent_response = get_intent_response(cliente, intent)
            response = respondWA(wa_client, intent_response[0]['text'])
        elif intent == "hello_whatsapp":
            intent_response = get_intent_response(cliente, intent)
            response = respondWA(wa_client, intent_response)
        else:
            intent_response = get_intent_response(cliente, intent)
            response = respondWABuildPC(cliente,response["context"],wa_client, intent_response)

        exit_db(cliente)
        #print(intent_response)
        

api.add_resource(CREATE_SESSION, '/createSession')  # Route_0
api.add_resource(GET_MESSAGE, '/getMessage')  # Route_1
api.add_resource(GET_WHATSAPP_MESSAGE, '/getWhatsappMessage')  # Route_2
api.add_resource(ADD_ITEM_TO_CART, '/addItemToCart')  # Route_3
api.add_resource(PDF, '/pdf')  # Route 4
api.add_resource(GET_CART, '/getCart')  # Route_4
api.add_resource(REMOVE_ITEM_TO_CART, '/removeItemToCart') # Route_5

if __name__ == '__main__':
    app.run(port='5002')
