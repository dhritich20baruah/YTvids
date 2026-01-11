from flask import Flask, request, jsonify, render_template, flash
from flask_cors import CORS
import math

app = Flask(__name__)

app.secret_key = "secret_key"

CORS(app)

@app.route("/", methods=["GET", "POST"])
def index():
    name = request.args.get("name", default="NA")
    lang = request.args.get("lang")
    flash("Please enter values to calculate", "Success")
    result = "Prediction: 42"
    if request.method == 'POST':
        print(request.form)
    return render_template("index.html", Prediction=result, items=['Apple', 'Banana', 'Cherry'], name=name, lang=lang)

@app.route('/predict', methods=['POST'])
def predict():
    feature = request.form.get('feature1')
    if not feature:
        flash('Please enter a value')
        return redirect('/')

    flash('Prediction complete')
    return redirect('/')


@app.route('/index2')
def index2():
    return render_template('index2.html')

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