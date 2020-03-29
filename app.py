from flask import Flask, jsonify, render_template,request
app = Flask(__name__)

import plotly.express as px
import pandas as pd
import numpy as np
import json



@app.route("/")
def index():
    return render_template('index.html')

@app.route("/charts")
def readData():
    return render_template('index.html')


@app.route("/getInfo)
def getInfo():
    return render_template('index.html')
    

if __name__ == "__main__":
    app.run(debug=True)
