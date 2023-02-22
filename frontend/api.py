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
#backend = alice_backend.AliceBackend()
backend = dummy_backend.AliceBackend()

'''
To access api in particular in browser url type:
localhost/api/<route>
'''

# Call a function here (no api) for browse and capture.

def setup_url(url):
    backend.browse_and_capture(url)

@api.route('/encrypted/')
def get_encrypted_packets_api():
    en_packets = backend.get_encrypted_packets()
    return json.dumps(en_packets)

@api.route('/decrypted/')
def get_decrypted_packets_api():
    de_packets = backend.get_encrypted_packets()
    return json.dumps(de_packets) 

@api.route('/tcp/')
def get_tcp():
    pass

@api.route('/tls/')
def get_tls():
    tls_handshake = backend.get_tls_handshake_details()
    return json.dumps(tls_handshake)
    
@api.route('/http/')
def get_http_details(self):
    pass

@api.route('/ip/')
def get_ip(self):
    #Need more information
    pass

