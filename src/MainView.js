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
        new BlockModel("Move Down", "move", []),
        new BlockModel("Move Up", "move", []),
        new BlockModel("Move Right", "move", []),
        new BlockModel("Move Left", "move", []),
        new BlockModel("If", "if", ['monkey', 'rabbit', 'turtle']),
        new BlockModel("End If", "if", []),
        new BlockModel("Repeat", "loop", ['1', '2', '3', '4', '5']),
        new BlockModel("End Repeat", "loop", []),
      ],
    commands: [new CommandModel(0, 0, "When play", 'start', 150, 0, [])],
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
  this.state.commands.sort(function(a, b){return a.order-b.order}).slice(index-1)
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
  this.state.commands.sort(function(a, b){return a.order-b.order}).slice(index-1)
  .forEach((cm, i) => {
    cm.order = cm.order + 1;
    console.log( cm.name + cm.id + ": " +  cm.order);
  });

  var commands = this.state.commands;

  this.setState({
      ...this.state, commands
  });
}

onDrop = (ev) => {
   let id = 0, top = 0, left = 0;
   console.log("dropY: " + ev.clientY);
   //position when the user drop the item
   const dropY = ev.clientY;
   let bname = ev.dataTransfer.getData("id");
   //get the selected block
   let bl = this.state.blocks.find(element => element.name === bname);
   if(bl === null || bl === undefined){
    console.log("undefined");
     let c1 = this.state.commands.find(element => element.id == bname);
     console.log("c1 name: " + c1.name + c1.order);
     //find the element which includes the drop position
     for(var i=1; i< this.state.commands.length; i++){
      if(dropY >= this.state.commands[i-1].top + 20  && dropY <= this.state.commands[i].top + 20 ){
        //place the element in its position
        this.state.commands[c1.order].order = i - 1;
        console.log("Order: " + (i - 1));
        //move up or down the rest elements 
        if(c1.top >= this.state.commands[i-1].top) {
          let j = i - 1;
          this.state.commands.sort(function(a, b){return a.order-b.order}).slice(i-1)
          .forEach((cm) => {cm.order = j++})
        } else {
          let k = 0;
          this.state.commands.sort(function(a, b){return a.order-b.order}).slice(0,i-1)
          .forEach((cm) => {cm.order = k++})
        }
      }
    }
   } else {

   //set the name and the category of the command
   let name = bl.name;
   let category =  bl.category;
   let select = bl.select;
   
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
  const c = new  CommandModel(id, index, name, category, top, left, select);
  
  //add command at the list
  this.state.commands.splice(index, 0, c);
   
   
  }
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
    if (pos == 450) {
      clearInterval(id);
    } else {
      pos++; 
      elem.style.bottom = pos + "px"; 
    }
  }
}

insideCommand = (c) => {
  //check if the command is inside an if or loop block  
  let inside = false
  for(var i=1; i< c.order; i++){
    if( this.state.commands[i].name == 'If' || this.state.commands[i].name == 'Repeat'){
      inside = true;
    }
    if( this.state.commands[i].name == 'End If' || this.state.commands[i].name == 'End Repeat'){
      inside = false;
    }
  }
  if(c.name == 'End If' || c.name == 'End Repeat'){
    inside = false;
  }
  return inside;
} 

setBgColor = (category) => {
  //set colors based on the category
  if(category === 'move') {
      return '#f55688';
  } else if(category === 'if' || category === 'ifEnd') {
      return '#FBBB40';
  } else if(category === 'loop' || category === 'loopEnd') {
     return'#51ceff';
  } else {
    return '#00B695';
  }
}


setBrColor = (category) => {
  //set colors based on the category
  if(category === 'move') {
    return '#e02062';
  } else if(category === 'if' || category === 'ifEnd') {
    return '#CF931E';
  } else if(category === 'loop' || category === 'loopEnd') {
    return '#5a9cff';
  }  else {
    return '#0f816c';
  }
}

render() {
    var blocks = []

    var commands = []

    var grid = []

    this.state.blocks.forEach ((b) => {
        blocks.push(
          <div style={{marginBottom: 15}}>
            <Block name={b.name} category={b.category} select={b.select}/>
          </div>
        );
    });

    this.state.commands.forEach ((c) => {
      commands.push(
        <div key={c.id} style={{top: c.top, left: c.left, position: 'absolute'}} onDragOver={(e)=>this.onDragOverDelete(e)} onDragStart={(e)=>this.onDragStartDelete(e, c.id)}>
             <div className={c.name == "If" || c.name == "Repeat" ? "command-select" : "command"} id={this.insideCommand(c) && "inside"} draggable
                style = {{backgroundColor: this.setBgColor(c.category), borderColor: this.setBrColor(c.category)}}>
                <span id="label">{c.name}</span>
                {/* <PlayIcon style={{width: '15%', height: 'auto'}}/> */}
                {c.select.length > 0 &&
                    <select id="select">
                        {c.select.map((x,y) => 
                          <option key={y} value={x}>{x}</option>
                        )}
                     </select>
                }
            </div>
          </div>
        // <Command id={c.id} name={c.name} category={c.category} top={c.top} left={c.left} order={c.order}/>
      );
  });

  // for()



  


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
                     {commands}
              </div>
        </div>
        <div className="buttons-panel">
          <div className="delete-panel" onDragOver={(e)=>this.onDragOver(e)} onDrop={(e)=>this.onDropDelete(e)}>
            <DeleteIcon id="delete"/>
          </div>
          <div className="action-panel">
            <button id="help-btn" className="round-btn"><HelpIcon/></button>
            <button onClick={this.myMove} id="play-btn" className="round-btn"><PlayIcon id="play-icon"/></button>
          </div>
        </div>
      </div>
      <div className="output">
        <div style={{gridRow: 1, gridColumn: '1/6', alignSelf: 'end', borderBottom: '1px #d3c8c8 dashed'}}></div>
        <div style={{gridRow: 2, gridColumn: '1/6', alignSelf: 'end', borderBottom: '1px #d3c8c8 dashed'}}></div>
        <div style={{gridRow: 3, gridColumn: '1/6', alignSelf: 'end', borderBottom: '1px #d3c8c8 dashed'}}></div>
        <div style={{gridRow: 4, gridColumn: '1/6', alignSelf: 'end', borderBottom: '1px #d3c8c8 dashed'}}></div>
        <div style={{gridRow: '1/6', gridColumn: 1, justifySelf: 'end', borderRight: '1px #d3c8c8 dashed'}}></div>
        <div style={{gridRow: '1/6', gridColumn: 2, justifySelf: 'end', borderRight: '1px #d3c8c8 dashed'}}></div>
        <div style={{gridRow: '1/6', gridColumn: 3, justifySelf: 'end', borderRight: '1px #d3c8c8 dashed'}}></div>
        <div style={{gridRow: '1/6', gridColumn: 4, justifySelf: 'end', borderRight: '1px #d3c8c8 dashed'}}></div>
          <img src={planet} height="150" style={{position: 'absolute', top: 5, left: '74vw'}}/>
          <img id="rocket" src={rocket} height="150" style={{position: 'absolute', bottom: 0, left: '78vw'}}/>
      </div>
    </div>
  );
}}

//export default Main;