from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import math

app = Flask(__name__)

CORS(app)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/calculator", methods=["POST"])
def calculate():
    data = request.get_json()

    expression = data.get("expression", "")

    try:
        result = eval(expression, {"__builtins__": None}, math.__dict__)
        print(result)
        return jsonify({"result": result})
    except Exception as e:
        print(f"Calculation error: {e}")
        return jsonify({"error": "Invalid expression"}), 400
    
if __name__ == "__main__":
    app.run(debug=True)