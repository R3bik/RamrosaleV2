# Flask App
from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
from chat import get_response

app = Flask(__name__)
CORS(app)


@app.get("/")  # New Syntax
# Old Syntax -> @app.route("/", methods=["GET"])
def index_get():
    return 'Chatbot Backend API'


@app.route('/api/chatbot', methods=['POST'])
def chatbot():
    try:
        message = request.json['message']
        response = get_response(message)  # Call your chatbot function here
        return jsonify({'answer': response}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=True)