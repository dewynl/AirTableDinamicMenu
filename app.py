from flask import Flask, render_template
from flask import jsonify
from AirTableClient import get_airtable_data

app = Flask(__name__)


@app.route('/')
def hello_world():
    records = get_airtable_data()
    return render_template('index.html', records=records)


if __name__ == '__main__':
    app.run()
