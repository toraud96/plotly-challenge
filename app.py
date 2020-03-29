from flask import Flask, jsonify, render_template,request
app = Flask(__name__)

import plotly.express as px
import pandas as pd
import numpy as np
import json
import plotly.express as px



@app.route("/")
def index():
    return render_template('index.html')

@app.route("/bar")
def bar():
    trace1 = {
            x: sample_values,
            y: otu_id,
            text: labels,
            marker: {
              color: 'pink'},
            type:"bar",
            orientation: "h",
    };
    data1 = [trace1];  
    layout1 = {
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
    };  
    Plotly.newPlot("bar", data1, layout1);
    return render_template('index.html')


# @app.route("/getInfo)
# def getInfo():
#     return render_template('index.html')
    

if __name__ == "__main__":
    app.run(debug=True)
