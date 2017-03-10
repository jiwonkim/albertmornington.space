$(document).ready(() => {
    const MARGIN_LEFT = 100; // margin around the axis
    const PADDING_TOP = 10; // padding inside within the axis
    const HEIGHT = 500;

    const timeline = d3.select('.navigation--timeline-view')
        .append('svg:svg')
            .attr('width', '100%')
            .attr('height', HEIGHT);

    const minT = d3.min(timelineData, (d) => d.timestamp);
    const maxT = d3.max(timelineData, (d) => d.timestamp);
    const scale = d3.scale.linear()
        .domain([minT, maxT])
        .range([PADDING_TOP, HEIGHT - PADDING_TOP]);

    const axis = d3.svg.axis()
        .scale(scale)
        .orient('left')
        .tickValues([
            1420070400,
            1451606400,
            1483228800
        ])
        .tickFormat((d) => {
            return new Date(d * 1000).getUTCFullYear();
        });

    timeline.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + MARGIN_LEFT + ', 0)')
        .call(axis);
});
