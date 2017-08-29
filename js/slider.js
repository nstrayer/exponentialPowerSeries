// The function onDrag gets constantly fed slider position
// onDone gets it only after the user has stopped sliding.
export const slider = ({
  c,
  sliderRange,
  sliderWidth,
  onDone,
  onDrag,
  startPosition = 0,
  xPos = 0.5,
  yPos = 0.5,
  intClamp = true, // clamp handle to nearest int?
  tickFont = 'san serif',
}) => {
  
  // styles
  const roundEnds = {
    strokeLinecap: 'round'
  };
  
  const track = {
    stroke: '#000',
    strokeOpacity: 0.3,
    strokeWidth: '10px',
  };
  
  const trackInset = {
    stroke: '#ddd',
    strokeWidth: 8,
  };
  
  const trackOverlay = {
    pointerEvents: 'stroke',
    strokeWidth: 50,
    stroke: 'transparent',
    cursor: 'crosshair',
  }
  
  const handleStyle = {
    fill: '#fff',
    stroke:' #000',
    strokeOpacity: 0.5,
    strokeWidth: '1.25px',
  }
  
  const tickStyle =  {
    font: `10px ${tickFont}`,
  }

  const {height, width, svg} = c;
  
  const xScale = d3.scaleLinear()
      .domain(sliderRange)
      .range([0, sliderWidth])
      .clamp(true);
  
  const slider = svg.append("g")
      .attr("class", "slider")
      .attr("transform", `translate( ${width*xPos - sliderWidth/2}, ${height*yPos})`);
  
  slider.append("line")
      .attr("class", "track")
      .st(Object.assign({}, roundEnds, track))
      .at({
        x1: xScale.range()[0],
        x2: xScale.range()[1]
      })
    .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
      .attr("class", "track-inset")
      .st(Object.assign({},roundEnds, trackInset))
    .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
      .attr("class", "track-overlay")
      .st(Object.assign({}, roundEnds, trackOverlay))
      .call(
        d3.drag()
          .on("start.interrupt", function() { slider.interrupt(); })
          .on("start drag", dragBehavior)
          .on("end", finishBehavior)
      )
  
  slider.insert("g", ".track-overlay")
      .attr("class", "ticks")
      .st(tickStyle)
      .attr("transform", "translate(0," + 18 + ")")
    .selectAll("text")
    .data(xScale.ticks(10))
    .enter().append("text")
      .attr("x", xScale)
      .attr("text-anchor", "middle")
      .text(d => d);
  
  const handle = slider.insert("circle", ".track-overlay")
      .attr("class", "handle")
      .st(handleStyle)
      .attr("r", 9)
      .attr("cx", xScale(startPosition));
      
  const getValue = (eventX) => xScale.invert(eventX);
      
  function dragBehavior(){
    const scaledPos = getValue(d3.event.x);
    // by inverting and reverting the position we assert bounds on the slider.
    handle.attr("cx", xScale(scaledPos))
    onDrag? onDrag(scaledPos): null;
  }
  
  function finishBehavior(){
    const dragPos = getValue(d3.event.x);
    const finalPos = intClamp ? Math.round(dragPos): dragPos;
    handle
      .transition(d3.transition('slideSnap').duration(100))
      .attr("cx", xScale(finalPos))

    onDone(finalPos);
  }
      
 
}
