from flask import url_for

SECONDS_IN_WEEK = 604800

def get_timeline_data(r):
    post_dicts = []
    post_keys = r.keys('post:*')
    for post_key in post_keys:
        timestamp, title, alias, site = r.hmget(
            post_key,
            'timestamp',
            'title',
            'alias',
            'site',
        )
        post_dicts.append({
            'timestamp': int(timestamp),
            'title': title,
            'url': url_for('show_post', post_alias=alias),
            'site': site,
        })

    return _merge_adjacent(post_dicts)

def _merge_adjacent(post_dicts):
    merged = []
    sorted_post_dicts = sorted(
        post_dicts,
        key=lambda d: d['timestamp'],
    )

    for curr in sorted_post_dicts:
        prev = merged and merged[-1]
        if prev and curr['timestamp'] - prev['timestamp'] < SECONDS_IN_WEEK:
            prev['posts'].append(curr)
        else:
            merged.append({
                'timestamp': curr['timestamp'],
                'posts': [{
                    'title': curr['title'],
                    'url': curr['url'],
                    'site': curr['site']
                }]
            })

    return merged
