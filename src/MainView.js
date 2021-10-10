import './Main.css';
import React, { Component } from 'react' ;
import Block from './block/blockPresenter';
import BlockModel from './block/blockModel';
import CommandModel from './command/commandModel';
import {ReactComponent as HelpIcon} from './help.svg';
import {ReactComponent as DeleteIcon} from './delete.svg';
import {ReactComponent as PlayIcon} from './play_arrow.svg';
import rocket from './Rocket_Panda.png';
import planet from './Supermarket_Planet.png';

export default class MainView extends Component {
  
  state = {
    blocks: [
        new BlockModel("Move Down", "move"),
        new BlockModel("Move Up", "move"),
        new BlockModel("Move Right", "if"),
        new BlockModel("Move Left", "loop"),
      ],
    commands: [new CommandModel(0, 0, "When play", 'move', 150, 0)],
    lastTop: 150,
    id:1,
    order:1,
}


onDragStart = (ev, id) => {
    ev.dataTransfer.setData("id", id);
}

onDragOver = (ev) => {
    ev.preventDefault();
    const dropY = ev.clientY;
}

moveCommandsDown = () =>{
  var top = 150;
  this.state.commands.sort(function(a, b){return a.order-b.order}).forEach((cm) => {
    cm.top = top;
    top =  top + 40;
    console.log("top " + cm.name + ": " + cm.top);
  })
  return this.state.commands;
}

changeOrder = (index) =>{
  this.state.commands.slice(Math.max(this.state.commands.length - index, 0))
  .forEach((cm, i) => {
    cm.order = cm.order + 1;
  });

  var commands = this.state.commands;

  this.setState({
      ...this.state, commands
  });
}

onDrop = (ev, action) => {
   let id = 0, top = 0, left = 0;
   let bname = ev.dataTransfer.getData("id");
   const bl = this.state.blocks.find(element => element.name === bname);
   let name = bl.name;
   let category =  bl.category;

   console.log("dropY: " + ev.clientY);
   //position when the user drop the item
   const dropY = ev.clientY;

   //add the block at the commands
   

   //find the closest command at the drop position
   var index = this.state.commands.length;
   console.log("Index1: " + index);

   var minDifferenceTop = this.state.lastTop; 
   if(dropY < minDifferenceTop && dropY > 150){
    for(var i=1; i<= this.state.commands.length; i++){
      if(dropY > this.state.commands[i-1].top && dropY < this.state.commands[i].top){
        minDifferenceTop = this.state.commands[i-1].top;
        //add the item on the top of the current one
        index = i - 1;
        console.log("Index2: " + index);
      }
    } 
    //place it on the top of the first element which dropY < cm.top
    top = minDifferenceTop; 
    this.changeOrder(index + 2);
   } else {
     //place it on the bottom of the last element
    top = minDifferenceTop + 40;
   }
    
  id = this.state.id;
  this.state.id += 1;
  console.log("Top " + top);

  // create new command object 
  const c = new  CommandModel(id, index, name, category, top, left);
  
  //add command at the list
  this.state.commands.splice(index, 0, c);
  
  this.state.lastTop = this.state.commands.slice(-1)[0].top;
   
   console.log(this.state.commands);

   var commands = this.moveCommandsDown();

   this.setState({
       ...this.state, commands
   });
}


onDropDelete = (ev) => {
  let id = ev.dataTransfer.getData("id");

  const bl = this.state.commands.find(element => element.name === id);
  
  const index = this.state.commands.indexOf(bl);
  this.state.commands.splice(index, 1);
  const commands = this.state.commands;

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
    var blocks = []

    var commands = []

    var c = []

    this.state.blocks.forEach ((b) => {
        blocks.push(
          <div style={{marginBottom: 15}}>
            <Block name={b.name} category={b.category}/>
          </div>
        );
    });

    this.state.commands.sort(function(a, b){return a.order-b.order}).forEach ((t, index) => {
      commands.push(
        <div style={{
          top: t.top, left: t.left, position: 'absolute'}}>
           <div className="command">
            {t.name}
          </div>
        </div>
      );
  });

  
  this.state.commands.sort(function(a, b){return a.order-b.order}).forEach ((t, index) => {
    c.push(
      <p>{t.name}</p>
    );
});


  return (
    <div className="main-grid">
      <div className="sidebar">
        <h3>Actions</h3>
        <div className="wip">
          {blocks}
        </div>
      </div>
      <div className="coding-panel">
        <div className="description">
        {c}
            <h3>Level 1: Visit the planet</h3>
            <p>Help the little panda to go to the supermarket planet, to start his work. </p>
            <p>Drag and drop the actions here:</p>
              
            
        </div>
        <div className="commands">
              <div className="droppable" 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e)}>
                    <div id="start">When play</div>
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