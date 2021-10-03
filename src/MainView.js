import './Main.css';
import React, { Component } from 'react' ;
import {ReactComponent as HelpIcon} from './help.svg';
import {ReactComponent as DeleteIcon} from './delete.svg';
import {ReactComponent as PlayIcon} from './play_arrow.svg';
import rocket from './Rocket_Panda.png';
import planet from './Supermarket_Planet.png';

export default class MainView extends Component {
  state = {
    blocks: [
        {name:"Move Up",category:"wip", bgcolor: "yellow"},
        {name:"Move Down", category:"wip", bgcolor:"pink"},
        {name:"Move Right", category:"wip", bgcolor:"skyblue"},
        {name:"Move Left", category:"wip", bgcolor:"skyblue"}
      ],
    commands: [],
}

onDragStart = (ev, id) => {
    ev.dataTransfer.setData("id", id);
}

onDragOver = (ev) => {
    ev.preventDefault();
}

onDrop = (ev, action) => {
   let id = ev.dataTransfer.getData("id");

   const bl = this.state.blocks.find(element => element.name == id);

   this.state.commands.push(bl);
   console.log(this.state.commands)

   var commands = this.state.commands;

   this.setState({
       ...this.state, commands
   });
}

onDropDelete = (ev) => {
  let id = ev.dataTransfer.getData("id");

  const commands = this.state.commands.filter(element => {return element.name !== id;});

  console.log(this.state.commands)

  this.setState({
      ...this.state, commands
  });
}

myMove = () => {
  let id = null;
  const elem = document.getElementById("rocket");   
  let pos = 0;
  clearInterval(id);
  id = setInterval(frame, 5);
  function frame() {
    if (pos == 400) {
      clearInterval(id);
    } else {
      pos++; 
      elem.style.bottom = pos + "px"; 
    }
  }
}

render() {
    var blocks = {
        wip: [],
        complete: []
    }

    var commands = []

    this.state.blocks.forEach ((t) => {
        blocks[t.category].push(
            <div key={t.name} 
                onDragStart = {(e) => this.onDragStart(e, t.name)}
                draggable
                className="block"
                //style = {{backgroundColor: t.bgcolor}}
            >
                {t.name}
            </div>
        );
    });

    this.state.commands.forEach ((t) => {
      commands.push(
          <div key={t.name} 
              onDragStart = {(e) => this.onDragStart(e, t.name)}
              draggable
              className="block"
              //style = {{backgroundColor: t.bgcolor}}
          >
              {t.name}
          </div>
      );
  });


  return (
    <div className="main-grid">
      <div className="sidebar">
        <h3>Actions</h3>
        <div className="wip" 
          onDragOver={(e)=>this.onDragOver(e)} 
          //onDrop={(e)=>{this.onDrop(e, "wip")}}
          >
          {blocks.wip}
        </div>
      </div>
      <div className="coding-panel">
        <div className="description">
            <h3>Level 1: Visit the planet</h3>
            <p>Help the little panda to go to the supermarket planet, to start his work. </p>
            <p>Drag and drop the actions here:</p>
        </div>
        <div className="commands">
              <div className="droppable" 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e)}>
                     {commands}
              </div>
        </div>
        <div className="buttons-panel">
          <div className="delete-panel" onDragOver={(e)=>this.onDragOver(e)} onDrop={(e)=>this.onDropDelete(e)}>
            <DeleteIcon/>
          </div>
          <div className="action-panel">
            <button id="help-btn" className="round-btn"><HelpIcon/></button>
            <button onClick={this.myMove} id="play-btn" className="round-btn"><PlayIcon id="play-icon"/></button>
          </div>
        </div>
      </div>
      <div className="output">
          <img src={planet} height="150" style={{position: 'absolute', top: 5, left: '74vw'}}/>
          <img id="rocket" src={rocket} height="150" style={{position: 'absolute', bottom: 0, left: '79vw'}}/>
      </div>
    </div>
  );
}}

//export default Main;