import redis
import simplejson
from db.post import get_timeline_data
from flask import abort
from flask import Flask
from flask import render_template
from post_index import POST_ALIASES

r = redis.StrictRedis(host='127.0.0.1', charset="utf-8", decode_responses=True)

application = Flask(__name__)

@application.route('/')
def index():
    timeline_data = get_timeline_data(r)
    return render_template(
        'index.html',
        timeline_data=simplejson.dumps(timeline_data),
    )

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
