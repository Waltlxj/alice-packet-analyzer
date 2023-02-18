'''
    api.py

    An in-progress API for our webapp
'''
import sys
import flask
import json

api = flask.Blueprint('api', __name__)

@api.route('/encrypted/')
def get_encrypted_packets_api(self):

    pass

@api.route('/decrypted/')
def get_decrypted_packets_api(self):

    pass

@api.route('/tls/')
def get_tls_handshake_api(self):
    
    pass