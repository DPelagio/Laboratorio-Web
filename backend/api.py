# API
import os
import json
import logging
import requests

import flask
from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS
from dotenv import load_dotenv
from flask_api import status

from jsonschema import validate, ValidationError
from ibm_watson import AssistantV2, ApiException
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from flask import jsonify

import pymongo

from twilio.rest import Client

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
            assistant_id=request_data.get("assistant_id")
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
    }

    print(watson_response)
    
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


def getClient():
    wa_client = Client(account_sid, auth_token)
    return wa_client


def obtainLastMessage(wa_client):
    messages = wa_client.messages.list(limit=2)
    last_message = messages[0].body
    return last_message


def respondWA(wa_client, query):
    print(query)
    response = wa_client.messages.create( 
                              from_='whatsapp:+14155238886',  
                              body= query,
                              to='whatsapp:+5215548885790' 
                          )
    return response

def respondWACatalog(cliente, wa_client, ):
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

class CREATE_SESSION(Resource):
    def get(self):
        return watson_create_session()


class GET_MESSAGE(Resource):
    def post(self):
        cliente = connect_db()
        #watson_session_id = watson_create_session()
        watson_session_id = request.json["sessionId"]
        #watson_session_id = request.json["watson_session_id"]
        global_text = request.json["message"]
        print("session:", watson_session_id)
        response = watson_response(watson_session_id,global_text, "web")
        print (response)
        intent = response["id"] ## Esto lo mandamos a mongo
        '''
        message = global_text
        
        post = {
            "intent" : intent,
            "message" : message
        }'''

        #insertar_intent = write_intent(cliente, post)

        print(intent)
        
        intent_response = get_intent_response(cliente, intent)
    
        exit_db(cliente)

        return jsonify(response=intent_response)


class GET_WHATSAPP_MESSAGE(Resource):
    def post(self):
        # Connect to the mongodb
        cliente = connect_db()
        # Create a session for watson
        watson_session_id = watson_create_session()
        # Create whatsapp client
        wa_client = getClient()

        wa_message = obtainLastMessage(wa_client)

        response = watson_response(watson_session_id, wa_message, "whatsapp")
        print (response)
        
        intent = response["id"]
        intent_response = ''
        if intent == "products":
            respondWACatalog(cliente, wa_client)
        elif intent == "anything_else":
            intent_response = get_intent_response(cliente, intent)
            response = respondWA(wa_client, intent_response[0]['text'])
        else:
            intent_response = get_intent_response(cliente, intent)
            response = respondWA(wa_client, intent_response)

        exit_db(cliente)
        #print(intent_response)
        

api.add_resource(CREATE_SESSION, '/createSession')  # Route_0
api.add_resource(GET_MESSAGE, '/getMessage')  # Route_1
api.add_resource(GET_WHATSAPP_MESSAGE, '/getWhatsappMessage')  # Route_2

if __name__ == '__main__':
    app.run(port='5002')
