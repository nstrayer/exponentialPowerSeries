import {seq, calcStep, showSteps} from './calculateEx.js';

export const drawSeries = (exponent, numberSteps, c) => {
  const barWidth = 20;

  const {height, x, y, xAxis, yAxis, drawAxis} = c;
  
  // calculate the value at each step in the series.
  const steps = showSteps(exponent, numberSteps);
  console.log(steps);
  
  x.domain([-1, numberSteps - 1])
  y.domain([0, d3.max(steps)])
  
  xAxis.ticks(numberSteps);
  yAxis.ticks(5);
  drawAxis()
  
  const stepBars = c.svg.selectAll('.stepBars')
    .data(steps, (d,i) => i);
    
  stepBars.enter()
    .append('rect')
    .attr('class', 'stepBars')
    .at({ //constant attributes
      width: barWidth,
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
      height: (d,i) => c.height - c.y(d)
    });
};