from flask import abort
from flask import Flask
from flask import render_template
from post_index import POST_ALIASES

application = Flask(__name__)

@application.route('/')
def index():
    return render_template('index.html')

@application.route('/hello')
def hello():
    return render_template('hello-world.html')

@application.route('/post/<post_alias>')
def show_post(post_alias):
    if post_alias not in POST_ALIASES:
        abort(404)

    return render_template('{}.html'.format(post_alias))

if __name__ == "__main__":
    application.run(host='0.0.0.0')
