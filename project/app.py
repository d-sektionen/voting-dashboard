from flask import Flask, render_template
import time

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.template_filter('autoversion')
def autoversion_filter(filename):
    return "{0}?v={1}".format(filename, time.time())
