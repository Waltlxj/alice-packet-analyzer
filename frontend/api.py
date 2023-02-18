'''
    api.py

    An in-progress API for our webapp
'''
import sys
import flask
import json
import dummy_backend

api = flask.Blueprint('api', __name__)

#TO-DO: change to real backend
backend = dummy_backend.AliceBackend()

#localhost/api/____

@api.route('/ip/')
def get_ip(self):
    #Need more information
    pass

@api.route('/encrypted/')
def get_encrypted_packets_api():
    en_packets = backend.get_encrypted_packets()
    return json.dumps(en_packets)

@api.route('/decrypted/')
def get_decrypted_packets_api():
    de_packets = backend.get_encrypted_packets()
    return json.dumps(de_packets) 

@api.route('/tls/')
def get_tls_api():
    tls_handshake = backend.get_tls_handshake_details()
    return json.dumps(tls_handshake)