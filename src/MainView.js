import './Main.css';
import React, { Component } from 'react' ;
import Block from './block/blockPresenter';
import BlockModel from './block/blockModel';
import Command from './command/commandPresenter';
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
    heightB: 40, //the height of a block/command 
    id:1,
    order:1,
}


onDragStart = (ev, id) => {
    ev.dataTransfer.setData("id", id);
}

onDragOver = (ev) => {
    ev.preventDefault();
}

onDragOverDelete = (ev) => {
  ev.preventDefault();
}

onDragStartDelete = (ev, id) => {
  ev.dataTransfer.setData("id", id);
}

drawCommands = () =>{
  var top = 150;
  this.state.commands.sort(function(a, b){return a.order-b.order}).forEach((cm) => {
    cm.top = top;
    top =  top + this.state.heightB;
    console.log("top " + cm.name + ": " + cm.top);
  })
  return this.state.commands;
}


moveOrderUp = (index) =>{
  this.state.commands.slice(index-1)
  .forEach((cm, i) => {
    cm.order = cm.order - 1;
    console.log( cm.name + cm.id + ": " +  cm.order);
  });

  var commands = this.state.commands;

  this.setState({
      ...this.state, commands
  });
}

moveOrderDown = (index) =>{
  this.state.commands.slice(index-1)
  .forEach((cm, i) => {
    cm.order = cm.order + 1;
    console.log( cm.name + cm.id + ": " +  cm.order);
  });

  var commands = this.state.commands;

  this.setState({
      ...this.state, commands
  });
}

onDrop = (ev, action) => {
   let id = 0, top = 0, left = 0;
   let bname = ev.dataTransfer.getData("id");
   //get the selected block
   const bl = this.state.blocks.find(element => element.name === bname);
   //set the name and the category of the command
   let name = bl.name;
   let category =  bl.category;

   console.log("dropY: " + ev.clientY);
   //position when the user drop the item
   const dropY = ev.clientY;
   
   var index = this.state.commands.length;
   console.log("Index1: " + index);
   //set the default position as the position after the last command
   var minDifferenceTop = this.state.commands.slice(-1)[0].top; 

   //if the user drop the block between the first and the klast command
   if(dropY < minDifferenceTop && dropY > this.state.commands[0].top){
    console.log("dropY < minDifferenceTop && dropY > this.state.commands[0].top" );
    //find the closest command at the drop position
    for(var i=1; i< this.state.commands.length; i++){
      if(dropY >= this.state.commands[i-1].top + this.state.heightB/2 && dropY <= this.state.commands[i].top + this.state.heightB/2){
        minDifferenceTop = this.state.commands[i].top;
        console.log("minDifferenceTop : " + minDifferenceTop );
        //add the item on the bottom of the current one
        index = i;
        console.log("Index2: " + index);
      }
    } 
    //place it on the bottom of the element that the user drop the block
    top = minDifferenceTop; 
    //change the order of the commands after it 
    this.moveOrderDown(index + 1);
   } else {
     //place it on the bottom of the last element
    top = minDifferenceTop + this.state.heightB/2;
   }
    
  id = this.state.id;
  this.state.id += 1;
  console.log("Top " + top);

  // create new command object 
  const c = new  CommandModel(id, index, name, category, top, left);
  
  //add command at the list
  this.state.commands.splice(index, 0, c);
   
   console.log(this.state.commands);

   //get the commands with the position based on their order
   var commands = this.drawCommands();

   this.setState({
       ...this.state, commands
   });
}





onDropDelete = (ev) => {
  let id = ev.dataTransfer.getData("id");
  console.log("id:"+ id);
  const bl = this.state.commands.find(element => element.id == id);
  console.log("bl.name:" + bl.name + bl.id);
  
  const index = this.state.commands.indexOf(bl);
  this.state.commands.splice(index, 1);
  this.moveOrderUp(index+1)
  const commands = this.drawCommands();

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

setBgColor = (category) => {
  //set colors based on the category
  if(category === 'move') {
      return '#AA57A2';
  } else if(category === 'if' || category === 'ifEnd') {
      return '#FBBB40';
  } else if(category === 'loop' || category === 'loopEnd') {
     return'#40FBD9';
  } 
}


setBrColor = (category) => {
  //set colors based on the category
  if(category === 'move') {
    return '#313873';
  } else if(category === 'if' || category === 'ifEnd') {
    return'#CF931E';
  } else if(category === 'loop' || category === 'loopEnd') {
    return'#00B695';
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

    this.state.commands.forEach ((c) => {
      commands.push(
        <div key={c.id} style={{top: c.top, left: c.left, position: 'absolute'}} onDragOver={(e)=>this.onDragOverDelete(e)} onDragStart={(e)=>this.onDragStartDelete(e, c.id)}>
             <div className="command" draggable
                style = {{backgroundColor: this.setBgColor(c.category), borderColor: this.setBrColor(c.category)}}>
                {c.name}
            </div>
          </div>
        // <Command id={c.id} name={c.name} category={c.category} top={c.top} left={c.left} order={c.order}/>
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
            <h3>Level 1: Visit the planet</h3>
            <p>Help the little panda to go to the supermarket planet, to start his work. </p>
            <p>Drag and drop the actions here:</p>
              
            
        </div>
        <div className="commands">
              <div className="droppable" 
                    onDrop={(e)=>this.onDrop(e)}>
                    {/* <div id="start">
                        <span id="label">When play</span>
                        <select id="select">
                          <option value="grapefruit">Grapefruit</option>
                          <option value="lime">Lime</option>
                          <option selected value="coconut">Coconut</option>
                          <option value="mango">Mango</option>
                        </select>
                    </div> */}
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