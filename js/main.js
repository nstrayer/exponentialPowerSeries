// import d3 from 'https://d3js.org/d3.v4.min.js';

import {drawSeries} from './drawSeries.js';
import {slider} from './slider.js';

// setup svg for drawing.
var sel = d3.select('#viz').html('');

var c = d3.conventions({
  parentSel: sel,
  totalWidth: sel.node().offsetWidth,
  height: 400,
  margin: {left: 50, right: 50, top: 30, bottom: 30}
});




let expon = 3;
let numberSteps = 10;

drawSeries(3, 10, c);

slider({
  c,
  sliderRange: [0, 10],
  sliderWidth: 200,
  startPosition: expon,
  xPos: 0.7,
  yPos: -0.05,
  tickFont: 'san serif',
  onDone: (pos) => {
    expon = pos;
    drawSeries(expon, numberSteps, c)
  }
});

slider({
  c,
  sliderRange: [0, 30],
  sliderWidth: 200,
  startPosition: numberSteps,
  xPos: 0.7,
  yPos: 0.05,
  tickFont: 'san serif',
  onDone: (pos) => {
    numberSteps = pos;
    drawSeries(expon, numberSteps, c)
  }});
