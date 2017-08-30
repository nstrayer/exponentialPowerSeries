export function drawStacked(steps, expon, c){
  const barHeight = 10;
  const trans = d3.transition('barMove').duration(400);
  const {width, height} = c;
  
  const svg = c.svg.selectAppend('g.stackedViz')
    .translate([0,-35]);
  
  // current estimate of e^x
  const trueValue = Math.exp(expon);
  
  const sumScale = d3.scaleLinear()
    .range([0, width])
    .domain([0, trueValue]);
    
  const colorScale = d3.scaleSequential(d3.interpolatePiYG)
    .domain([0, 30]);
  
  const stackData = steps.reduce(
    (series, step, i) => {
      const curSum = i > 0 ? series[i-1].end : 0;
      return [...series, {start: curSum, end: curSum + step}];
    },
    []
  );

  const estimate = stackData[stackData.length - 1].end;
  
  const trueLine = svg.selectAppend('g.trueLine');
  
  trueLine.selectAppend('line')
    .at({
      x1: 0,
      x2: 0,
      y1: -26,
      y2: barHeight,
      strokeWidth: 1,
      stroke: 'black',
    });
  
  trueLine.selectAppend('text')
    .at({
      y: -15,
      x: -2,
      textAnchor: 'end'
    })
    .html(`
      <tspan>
        e
        <tspan baseline-shift = 'super' font-size = 12>
         ${expon}
        </tspan>
        = ${d3.round(trueValue, 3)}
      </tspan>
    `);
    
  trueLine.transition(trans)
    .translate([sumScale(trueValue), 0]);

  const estimatedLine = svg
    .selectAppend('g.estimatedLine');
  
  estimatedLine.selectAppend('line')
    .at({
      x1: 0,
      x2: 0,
      y1: -barHeight/2,
      y2: 20 + barHeight,
      strokeWidth: 1,
      stroke: 'black',
    });
  
  estimatedLine.selectAppend('text')
    .at({
      y: 15 + barHeight,
      x: -2,
      textAnchor: 'end'
    })
    .text(`series estimate = ${d3.round(estimate, 3)}`);
    
  estimatedLine.transition(trans)
    .translate([sumScale(estimate), 0]);
    
  const bars = svg.selectAppend('g.stackedBars')
    .selectAll('.bar')
    .data(stackData, (d,i) => i);
  
  bars.enter()
    .append('rect.bar')
    .at({
      y: -barHeight/2,
      x: (d) => sumScale(d.start),
      height: barHeight,
      width: 0,
      fill: (d,i) => colorScale(i),
      stroke: 'white'
    })
    .merge(bars)
    .transition(trans)
    .at({
      x: (d) => sumScale(d.start),
      width: d => sumScale(d.end) - sumScale(d.start),
      fill: (d,i) => colorScale(i)
    });
    
  bars.exit()
    .remove();
    
}