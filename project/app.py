from flask import Flask, render_template
import time

app = Flask(__name__)


# Ugly fix until I come up with something better.
@app.route('/wp-content/d-sektionen_voting')
def index():
    return render_template('index.html')


@app.template_filter('autoversion')
def autoversion_filter(filename):
    return "{0}?v={1}".format(filename, time.time())


if __name__ == '__main__':
    app.run(debug=True)
