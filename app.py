from flask import Flask, render_template, request, url_for

from word_finder import get_words


app = Flask(__name__)


@app.route("/", methods=("GET", "POST"))
def index():
    if request.method == "GET":
        return render_template("index.html", words=[])
    elif request.method == "POST":
        pat = request.form["pattern"]
        c = request.form["contains"]
        e = request.form["exclude"]
        return get_words(pat, c, e)
