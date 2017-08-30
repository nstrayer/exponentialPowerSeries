// import d3 from 'https://d3js.org/d3.v4.min.js';
// import slid3r from './libs/slid3r.js';
import {showSteps} from './calculateEx.js';
import {drawStacked} from './drawStacked.js';
import {drawSeries} from './drawSeries.js';

//powerSeriesViz('#viz', 6, 10);

function powerSeriesViz(target = '#viz', startExpon = 3, startNumberSteps = 10){
  const sliderWidth = 200;
  
  // setup svg for drawing.
  const sel = d3.select(target).html('');
  
  let c = d3.conventions({
    parentSel: sel,
    totalWidth: sel.node().offsetWidth,
    height: 400,
    margin: {left: 50, right: 50, top: 130, bottom: 30}
  });
  
  
  function runViz(config){
    let {expon, numberSteps} = config;
    
    let exponSlider = slid3r()
      .width(sliderWidth)
      .font('garamond')
      .range([0,20])
      .label('Exponent')
      .onDone(pos => redraw(pos,'expon'));
      
    let stepsSlider = slid3r()
      .width(sliderWidth)
      .font('garamond')
      .range([0,30])
      .label('Number of Steps')
      .onDone(pos => redraw(pos,'numSteps'));
      
    function redraw(pos, type){
      expon = type === 'expon' ? pos: expon;
      numberSteps = type === 'numSteps' ? pos: numberSteps;
      
      // calculate the value at each step in the series.
      const steps = showSteps(expon, numberSteps);
      drawSeries(steps, c);
      drawStacked(steps, expon, c);
    }
    
    const drawIt = () => {
      sel.select('svg').remove();
      
      //update c
      c = d3.conventions({
        parentSel: sel,
        totalWidth: sel.node().offsetWidth,
        height: 400,
        margin: {left: 50, right: 50, top: 130, bottom: 30}
      });
      
      exponSlider = exponSlider
        .loc([c.width * 0.4 - sliderWidth, -100])
        .startPos(expon);
      
      stepsSlider = stepsSlider
        .loc([c.width * 0.6 , -100])
        .startPos(numberSteps);
        
      c.svg.append('g').attr('class', 'exponSlider').call(exponSlider);
      c.svg.append('g').attr('class', 'stepsSlider').call(stepsSlider);
      
      redraw();
    };
    
    // Kickoff viz w/ default values.
    drawIt();
    
    // redraw on resize
    window.onresize = drawIt;
  }
  
  runViz({expon:startExpon, numberSteps:startNumberSteps});
  
}
