// import d3 from 'https://d3js.org/d3.v4.min.js';
// import slid3r from './libs/slid3r.js';

import {showSteps} from './calculateEx.js';
import {drawStacked} from './drawStacked.js'
import {drawSeries} from './drawSeries.js';

const sliderWidth = 200;
// setup svg for drawing.
var sel = d3.select('#viz').html('');

var c = d3.conventions({
  parentSel: sel,
  totalWidth: sel.node().offsetWidth,
  height: 400,
  margin: {left: 50, right: 50, top: 130, bottom: 30}
});


function runViz(config){
  let {expon = 3, numberSteps = 10} = config;
  
  const redraw = (pos, type) => {
    expon = type === 'expon' ? pos: expon;
    numberSteps = type === 'numSteps' ? pos: numberSteps;
    // calculate the value at each step in the series.
    const steps = showSteps(expon, numberSteps);
    drawSeries(steps, c);
    drawStacked(steps, expon, c);
  };
  
  const exponSlider = slid3r()
    .width(sliderWidth)
    .font('garamond')
    .range([0,20])
    .label('Exponent')
    .loc([c.width * 0.4 - sliderWidth, -100])
    .startPos(expon)
    .onDone(pos => redraw(pos,'expon'));
    
  const stepsSlider = slid3r()
    .width(sliderWidth)
    .font('garamond')
    .range([0,30])
    .label('Number of Steps')
    .loc([c.width * 0.6 , -100])
    .startPos(numberSteps)
    .onDone(pos => redraw(pos,'numSteps'));
  
  c.svg.append('g').attr('class', 'exponSlider').call(exponSlider);
  c.svg.append('g').attr('class', 'stepsSlider').call(stepsSlider);
  
  // Kickoff viz w/ default values.
  redraw();
}


runViz({expon:3, numberSteps:10})