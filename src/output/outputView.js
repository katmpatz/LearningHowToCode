import '../Main.css';
import React from 'react' ;
import rocket from '../img/Rocket_Panda.png';
import planet from '../img/Supermarket_Planet.png';

function OutputView(props) {

  let grid = []
  for(let i = 1; i<=4; i++){
    grid.push(<div style={{gridRow: i, gridColumn: '1/6', alignSelf: 'end', borderBottom: '1px #d3c8c8 dashed'}}></div>)
    grid.push(<div style={{gridRow: '1/6', gridColumn: i, justifySelf: 'end', borderRight: '1px #d3c8c8 dashed'}}></div>)
  }

  return (
      <div className="output">
          {grid}
          <img src={planet} height="150" style={{position: 'absolute', top: 5, left: '74vw'}}/>
          <img id="rocket" src={rocket} height="150" style={{position: 'absolute', bottom: 0, left: '78vw'}}/>
      </div>
  );
}

export default OutputView;
