const MARGIN_LEFT = 50;
const MARGIN_RIGHT = 20;
const MARGIN_TOP = 10, MARGIN_BOTTOM = 10;

const POST_TICK_LENGTH = 30;
const POST_HEIGHT = 25;

const SECONDS_IN_MONTH = 2592000;

function _getTimelineDateDomain() {
    const minT = d3.min(timelineData, d => d.timestamp);
    return [
        new Date(),
        new Date((minT - SECONDS_IN_MONTH) * 1000)
    ];
}

function _getTimelineHeightFromDateDomain(domain) {
	const timeDiff = Math.abs(domain[1].getTime() - domain[0].getTime());
	const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
	return Math.ceil(diffDays * 1.5);
}

function _deselect($flag) {
	if ($flag) {
		$flag.removeClass('flag--selected');
	} else {
		$('.flag--selected').removeClass('flag--selected');
	}
	$('.post').removeClass('post--dimmed');
}

function _select($flag) {
	$('.flag').removeClass('flag--selected');
	$flag.addClass('flag--selected');

	const site = $flag.attr('data-site');
	$('.post').not(`.post--${site}`).addClass('post--dimmed');
	$(`.post--${site}`).removeClass('post--dimmed');
}

$(document).ready(() => {
    const domain = _getTimelineDateDomain();

    const width = 448;
    const height = _getTimelineHeightFromDateDomain(domain);

    const timelineTickFormat = function(d) {
        const month = d.getMonth();
        if (month === 0) {
            return d3.timeFormat('%Y')(d);
        }
        if (month % 3 !== 0) {
            return '';
        }
        return d3.timeFormat('%b')(d);
    }

    const renderPostsForDataPoint = function(selection, d) {
        selection.append('line')
            .attr('x0', 0)
            .attr('x1', POST_TICK_LENGTH)
            .attr('y0', 0)
            .attr('y1', 0)
            .attr('class', 'post-tick')
            .attr('transform', `translate(${MARGIN_LEFT - POST_TICK_LENGTH}, 0)`);

        const midpoint = (d.posts.length - 1) / 2;
        d.posts.forEach((post, index) => {
            const yOffset = (index - midpoint) * POST_HEIGHT;
            const line = d3.line()
                .x(d => d.x)
                .y(d => d.y);

            selection.append('path')
                .datum([
                    {x: MARGIN_LEFT + 1, y: 0},
                    {x: MARGIN_LEFT + POST_TICK_LENGTH, y: yOffset},
                    {x: width - MARGIN_RIGHT, y: yOffset},
                ])
                .attr('class', 'post-underline')
                .attr('d', line);

            const link = selection.append('text')
                .attr('x', MARGIN_LEFT + POST_TICK_LENGTH)
                .attr('y', yOffset - 5)
                .attr('class', 'post-title')
                .text(post.title.toLowerCase())
                .on('click', () => {
                    window.location = post.url;
                });

            const linkWidth = link.node().getComputedTextLength();

            selection.append('text')
                .attr('x', MARGIN_LEFT + POST_TICK_LENGTH + linkWidth + 5)
                .attr('y', yOffset - 5)
                .attr('class', 'post-site')
                .text('• ' + post.site.toLowerCase());
        });
    }

    const timeline = d3.select('.navigation--timeline-view')
        .append('svg:svg')
            .attr('width', '100%')
            .attr('height', height);

    const minT = d3.min(timelineData, d => d.timestamp);
    const timelineScale = d3.scaleTime()
        .domain([
            new Date(),
            new Date((minT - SECONDS_IN_MONTH) * 1000)
        ])
        .range([MARGIN_TOP, height - MARGIN_BOTTOM]);

    const axis = d3.axisLeft(timelineScale)
        .ticks(d3.timeMonth.every(1))
        .tickFormat(timelineTickFormat);

    timeline.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(${MARGIN_LEFT}, 0)`)
        .call(axis);

    const posts = timeline.selectAll('.post')
      .data(timelineData)
      .enter().append('g')
        .attr('class', function(d) {
            let classList = ['post'];
            d.posts.forEach(function(post) {
                classList.push(`post--${post.site}`);
            });
            return classList.join(' ');
        })
        .attr('transform', function(d) {
            const date = new Date(d.timestamp * 1000);
            return 'translate(0, ' + timelineScale(date) + ')';
        })
        .each(function(d, i) {
            renderPostsForDataPoint(d3.select(this), d);
        });

    $('.flag').click(evt => {
        const $flag = $(evt.target);
        if ($flag.hasClass('flag--selected')) {
			_deselect($flag);
        } else {
			_select($flag)
        }
    });
});

$(document).keyup(e => {
	if (e.which == 27) {
		_deselect();
	}
});
