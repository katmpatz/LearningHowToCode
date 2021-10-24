import '../Main.css';
import React from 'react' ;
import rocket from '../img/Rocket_Panda.png';
import rocket1 from '../img/Rocket_Panda.png';
import rocket2 from '../img/Rocket_Panda.png';
import supermarket from '../img/Supermarket_Planet.png';
import bananaPlanet from '../img/Banana_Planet.png';
import monkey from '../img/Monkey.png';

function OutputView(props) {


  let grid = []
  let planets = [] 

  for(let i = 1; i<=4; i++){
    grid.push(<div key={'r'+ i} className="row-line" style={{gridRow: i, gridColumn: '1/6', alignSelf: 'end', borderBottom: '1px #d3c8c8 dashed'}}></div>)
    grid.push(<div key={'c'+ i} className="column-line" style={{gridRow: '1/6', gridColumn: i, justifySelf: 'end', borderRight: '1px #d3c8c8 dashed'}}></div>)
  }

  props.characterList.forEach ((c, i) => {
    console.log("props.characterList[i]" + c.name)
    planets.push(
      <img key={i} 
          src={c.name == "supermarket" ? supermarket : (c.name == "bananaPlanet" ? bananaPlanet  : monkey)} 
          width={c.name == "monkey" ? props.sqw /2 : props.sqw} 
      style={{position: 'absolute', bottom: props.setBottom(c.row), right: props.setRight(c.column)}}/>
    );
  });


  return (
      <div className="output">
          {grid}
          {planets}
          {props.model.curentLevel == 1 &&
            <img id="rocket" src={rocket} height={props.sqh}
            style={{position: 'absolute',  bottom:props.model.levelCommands.length < 2 ? 0 : props.model.rocketPosition.bottom, right:props.model.rocketPosition.right}}/>
          }
          {props.model.curentLevel == 2 &&
            <img id="rocket" src={rocket} height={props.sqh}
            style={{position: 'absolute',  bottom:0, right:props.model.rocketPosition.right}}/>
          }
         {props.model.curentLevel == 3 &&
            <img id="rocket" src={rocket} height={props.sqh}
            style={{position: 'absolute',  bottom:0, right:props.model.rocketPosition.right}}/>
          }
          
      </div>
  );
}

export default OutputView;
