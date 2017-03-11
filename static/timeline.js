$(document).ready(() => {
    const MARGIN_LEFT = 100; // margin around the axis
    const MARGIN_TOP = 10, MARGIN_BOTTOM = 10;
    const HEIGHT = 500;

    const SECONDS_IN_MONTH = 2592000;

    const timeline = d3.select('.navigation--timeline-view')
        .append('svg:svg')
            .attr('width', '100%')
            .attr('height', HEIGHT);

    const minT = d3.min(timelineData, (d) => d.timestamp);
    const scale = d3.scaleTime()
        .domain([
            new Date((minT - SECONDS_IN_MONTH) * 1000),
            new Date(),
        ])
        .range([MARGIN_BOTTOM, HEIGHT - MARGIN_TOP]);

    let tickValues = timelineData.map((d) => d.timestamp);

    const axis = d3.axisLeft(scale);

    timeline.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + MARGIN_LEFT + ', 0)')
        .call(axis);
});
