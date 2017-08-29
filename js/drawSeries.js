
export const drawSeries = (steps, c) => {

  const {svg, height, x, y, xAxis, yAxis, drawAxis, width} = c;
  const numberSteps = steps.length;
  const barWidth = (width / numberSteps) * 0.9;

  x.range([barWidth/1.9, width]).domain([0, numberSteps - 1])
  y.domain([0, d3.max(steps)])
  
  // ------------------------------------------------------//
  // Draw - Update Axes
  // ------------------------------------------------------//
  xAxis.ticks(numberSteps);
  yAxis.ticks(5);
  
  const xAxisSel = svg.selectAll('.x.axis').data([1]);
  xAxisSel.enter()
    .append('g')
    .attr('class', 'x axis')
    .attr("transform", "translate(0," + height + ")")
    .merge(xAxisSel)
    .transition(d3.transition('axisMove').duration(500))
    .call(xAxis);
    
  const yAxisSel = svg.selectAll('.y.axis').data([1]);
  yAxisSel.enter()
    .append('g')
    .attr('class', 'y axis')
    .merge(yAxisSel)
    .transition(d3.transition('axisMove').duration(500))
    .call(yAxis);
  
  // ------------------------------------------------------//
  // Draw bars for each step
  // ------------------------------------------------------//
  // I could use the rangeband scale but I'm too lazy and want to keep
  // using jetpacks scales instead.
  
  const stepBars = svg.selectAll('.stepBars')
    .data(steps, (d,i) => i);
  
  stepBars.exit().transition(d3.transition('barmove').duration(500))
    .at({ y: c.height, height: 0 });
  
  stepBars.enter()
    .append('rect')
    .attr('class', 'stepBars')
    .at({ //constant attributes
      fill: 'orangered',
      y: c.height,
      height: 1e-6,
      x: (d,i) => c.x(i) - barWidth/2,
    })
    .merge(stepBars) // update all bars with this.
    .transition(d3.transition('barmove').duration(500))
    .at({
      x: (d,i) => c.x(i) - barWidth/2,
      y: (d,i) => c.y(d),
      width: barWidth,
      height: (d,i) => c.height - c.y(d)
    });
  
};