'''
    app.py
    Sam Hiken James Brink

    API for the Crossword Crunch the website
    9 Novemeber 2022
'''
import flask
import argparse
import api

app = flask.Flask(__name__, static_folder='static', template_folder='templates')
app.register_blueprint(api.api, url_prefix='/api')

@app.route('/') 
def home():
    return flask.render_template('index.html')

@app.route('/encrypted') 
def encrypted():
    return flask.render_template('encrypted.html')

@app.route('/decrypted') 
def decrypted():
    return flask.render_template('decrypted.html')

@app.route('/verbose') 
def verbose():
    return flask.render_template('verbose.html')

# To run file in commandline type "python3 app.py localhost 5000"
if __name__ == '__main__':
    parser = argparse.ArgumentParser('An application that displays encrypted/unencrypted protocols.')
    parser.add_argument('host', help='the host to run on')
    parser.add_argument('port', type=int, help='the port to listen on')
    arguments = parser.parse_args()
    app.run(host=arguments.host, port=arguments.port, debug=True)