from flask import url_for

def get_timeline_data(r):
    timeline_data = []
    post_keys = r.keys('post:*')
    for post_key in post_keys:
        timestamp, title, alias, site = r.hmget(
            post_key,
            'timestamp',
            'title',
            'alias',
            'site',
        )
        timeline_data.append({
            'timestamp': timestamp,
            'title': title,
            'url': url_for('show_post', post_alias=alias),
            'site': site,
        })

    return timeline_data
