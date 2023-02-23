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

url = ''

# Call a function here (no api) for browse and capture.

def setup_url(user_url):
    backend.browse_and_capture(user_url)

'''
This might be stupid
@api.route(url)
def get_url():
    return url
'''

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
    tcp_handshake = backend.get_tcp_handshake_details()
    return json.dumps(tcp_handshake)

@api.route('/tls/')
def get_tls():
    tls_handshake = backend.get_tls_handshake_details()
    return json.dumps(tls_handshake)
    
@api.route('/http/')
def get_http_details(self):
    http = backend.get_http_details()
    return json.dumps(http)

@api.route('/ip/')
def get_ip(self):
    #Need more information
    ip = backend.get_ip_details()
    return json.dumps(ip)

