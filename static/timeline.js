$(document).ready(() => {
    const HEIGHT = 500;

    const MARGIN_LEFT = 100; // margin around the axis
    const MARGIN_TOP = 10, MARGIN_BOTTOM = 10;

    const POST_TICK_LENGTH = 30;

    const SECONDS_IN_MONTH = 2592000;

    let timelineTickFormat = function(d) {
        const month = d.getMonth();
        if (month === 0) {
            return d3.timeFormat('%Y')(d);
        }
        if (month % 3 !== 0) {
            return '';
        }
        return d3.timeFormat('%b')(d);
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
            d3.select(this).append('line')
                .attr('x0', 0)
                .attr('x1', POST_TICK_LENGTH)
                .attr('y0', 0)
                .attr('y1', 0)
                .attr('class', 'post-tick')
                .attr('transform', `translate(${MARGIN_LEFT - POST_TICK_LENGTH}, 0)`);
        });
});
