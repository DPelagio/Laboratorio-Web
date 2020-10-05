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


def watson_response(watson_session_id,message):
    
    iam_apikey = request_data.get("assistant_api_key")
    assistant_url = request_data.get("assistant_url")
    assistant_version = request_data.get('assistant_version')

    assistant = watson_instance(iam_apikey, assistant_url, assistant_version)
    context = request_data.get('context') if 'context' in request_data else {}

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
            context=context
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
        "response": watson_response["output"]["generic"][0]["text"],
        "intent":watson_response["output"]["intents"][0]["intent"],
        "session_id": watson_session_id
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


class GET_MESSAGE(Resource):
    def post(self):
        client = pymongo.MongoClient(uri, 27017)
        db = client.test
        collection = db.test
        
        watson_session_id = watson_create_session()
        global_text = request.json["message"]
        response = watson_response(watson_session_id,global_text)

        intent = response["intent"] ## Esto lo mandamos a mongo
        message = global_text
        print(message, " \n", intent)
        post = [{
            "intent" : intent,
            "message" : message
        }]
        print(post)
        fivestar = db.test.find_one({'message': 'hola'})
        print(fivestar)
        

        # intent_response = jsonify( html_body = mongoQuery)
        client.close()

        return jsonify( html_body = response)


api.add_resource(GET_MESSAGE, '/getMessage')  # Route_1

if __name__ == '__main__':
    app.run(port='5002')
