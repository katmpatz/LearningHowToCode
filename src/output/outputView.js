import '../Main.css';
import React from 'react' ;
import rocket from '../img/Rocket_Panda.png';
import supermarket from '../img/Supermarket_Planet.png';

function OutputView(props) {

  let grid = []
  let planets = []

  for(let i = 1; i<=4; i++){
    grid.push(<div key={'r'+ i} className="row-line" style={{gridRow: i, gridColumn: '1/6', alignSelf: 'end', borderBottom: '1px #d3c8c8 dashed'}}></div>)
    grid.push(<div key={'c'+ i} className="column-line" style={{gridRow: '1/6', gridColumn: i, justifySelf: 'end', borderRight: '1px #d3c8c8 dashed'}}></div>)
  }

  for(let i = 0; i<=props.characterList.length; i++){
    planets.push(
      <img key={i} src={supermarket} width={props.sqw} 
      style={{position: 'absolute', bottom: props.setBottom(props.characterList[1]), right: props.setRight(props.characterList[2])}}/>
    )
  }

  return (
      <div className="output">
          {grid}
          {planets}
          <img id="rocket" src={rocket} height={props.sqh}
          style={{position: 'absolute',  bottom:0, right:props.rocketRight}}/>
      </div>
  );
}

export default OutputView;
