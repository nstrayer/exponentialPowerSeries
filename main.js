// import d3 from 'https://d3js.org/d3.v4.min.js';

import {drawSeries} from './drawSeries.js'

// setup svg for drawing.
var sel = d3.select('#viz').html('');

var c = d3.conventions({
  parentSel: sel,
  totalWidth: sel.node().offsetWidth,
  height: 400,
  margin: {left: 50, right: 50, top: 30, bottom: 30}
});


drawSeries(3, 10, c);

