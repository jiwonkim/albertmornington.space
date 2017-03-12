$(document).ready(() => {
    const WIDTH = 448;
    const HEIGHT = 500;

    // margin around the timeline
    const MARGIN_LEFT = 50;
    const MARGIN_RIGHT = 20;
    const MARGIN_TOP = 10, MARGIN_BOTTOM = 10;

    const POST_TICK_LENGTH = 30;
    const POST_HEIGHT = 25;

    const SECONDS_IN_MONTH = 2592000;

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
                    {x: WIDTH - MARGIN_RIGHT, y: yOffset},
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
            .attr('height', HEIGHT);

    const minT = d3.min(timelineData, d => d.timestamp);
    const timelineScale = d3.scaleTime()
        .domain([
            new Date(),
            new Date((minT - SECONDS_IN_MONTH) * 1000)
        ])
        .range([MARGIN_TOP, HEIGHT - MARGIN_BOTTOM]);

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
        .attr('class', 'post')
        .attr('transform', function(d) {
            const date = new Date(d.timestamp * 1000);
            return 'translate(0, ' + timelineScale(date) + ')';
        })
        .each(function(d, i) {
            renderPostsForDataPoint(d3.select(this), d);
        });
});
