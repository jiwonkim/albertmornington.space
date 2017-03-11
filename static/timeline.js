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
    const timelineScale = d3.scaleTime()
        .domain([
            new Date(),
            new Date((minT - SECONDS_IN_MONTH) * 1000)
        ])
        .range([MARGIN_TOP, HEIGHT - MARGIN_BOTTOM]);

    let tickValues = timelineData.map((d) => d.timestamp);

    let timelineTickFormat = (d) => {
        const month = d.getMonth();
        if (month === 0) {
            return d3.timeFormat('%Y')(d);
        }
        if (month % 3 !== 0) {
            return '';
        }
        return d3.timeFormat('%b')(d);
    }

    const axis = d3.axisLeft(timelineScale)
        .ticks(d3.timeMonth.every(1))
        .tickFormat(timelineTickFormat);

    timeline.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + MARGIN_LEFT + ', 0)')
        .call(axis);
});
