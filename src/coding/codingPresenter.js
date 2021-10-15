import React from 'react';
import CodingView from './codingView';
import CommandModel from '../command/commandModel';
import useModelProperty from '../customHook';

function CodingPresenter(props){

    const blocks = useModelProperty(props.model, "levelBlocks");
    const windowVariables = useModelProperty(props.model, "windowVariables");
    const rocketPosition = useModelProperty(props.model, "rocketPosition");
    const commands = useModelProperty(props.model, "levelCommands");
    
    const heightB = 40; //the height of a block/command 
    const [id, setId] = React.useState(1);
    
 
    
    function onDragStart(ev, id) {
        ev.dataTransfer.setData("id", id);
    }
    
    function onDragOver(ev) {
        ev.preventDefault();
    }
    
    function onDragOverDelete(ev) {
      ev.preventDefault();
    }
    
    function onDragStartDelete(ev, id) {
      ev.dataTransfer.setData("id", id);
      console.log("onDragStartDelete", id)
    }
    
    function drawCommands(){
      let top = 150;
      commands.sort(function(a, b){return a.order-b.order}).forEach((cm) => {
        cm.top = top;
        top =  top + heightB;
        //console.log("top " + cm.name + ": " + cm.top);
      })
      return commands;
    }
    
    
    function moveOrderUp(index){
      commands.sort(function(a, b){return a.order-b.order}).slice(index-1)
      .forEach((cm, i) => {
        cm.order = cm.order - 1;
        //console.log( cm.name + cm.id + ": " +  cm.order);
      });
    
      let  cmd = commands;
      
      props.model.setCommands([...cmd])
    }
    
    function moveOrderDown(index){
      commands.sort(function(a, b){return a.order-b.order}).slice(index-1)
      .forEach((cm, i) => {
        cm.order = cm.order + 1;
        //console.log( cm.name + cm.id + ": " +  cm.order);
      });
    
      let  cmd = commands;
      props.model.setCommands([...cmd])
    }
    
    function onDrop(ev) {
       let idc = 0, top = 0;
       console.log("dropY: " + ev.clientY);
       //position when the user drop the item
       const dropY = ev.clientY;
       let bname = ev.dataTransfer.getData("id");
       //get the selected block
       let bl = blocks.find(element => element.name === bname);
       console.log("bkl: " + JSON.stringify(bl));
       if(bl === null || bl === undefined){
         let c1 = commands.find(element => element.id == bname);
         //find the element which includes the drop position
         for(let i=1; i< commands.length; i++){
          if(dropY >= commands[i-1].top + 20  && dropY <= commands[i].top + 20 ){
            //place the element in its position
            commands[c1.order].order = i - 1;
            // console.log("Order: " + (i - 1));
            //move up or down the rest elements 
            if(c1.top >= commands[i-1].top) {
              let j = i - 1;
              commands.sort(function(a, b){return a.order-b.order}).slice(i-1)
              .forEach((cm) => {cm.order = j++})
            } else {
              let k = 0;
              commands.sort(function(a, b){return a.order-b.order}).slice(0,i-1)
              .forEach((cm) => {cm.order = k++})
            }
          }
        }
       } else {
    
       //set the name and the category of the command
       let name = bl.name;
       let category =  bl.category;
       let select = bl.select;
       
       let index = commands.length;
       //console.log("Index1: " + index);
       //set the default position as the position after the last command
       let minDifferenceTop = commands.slice(-1)[0].top; 
    
       //if the user drop the block between the first and the klast command
       if(dropY < minDifferenceTop && dropY > commands[0].top){
        //console.log("dropY < minDifferenceTop && dropY > commands[0].top" );
        //find the closest command at the drop position
        for(let i=1; i< commands.length; i++){
          if(dropY >= commands[i-1].top + heightB/2 && dropY <= commands[i].top + heightB/2){
            minDifferenceTop = commands[i].top;
            //console.log("minDifferenceTop : " + minDifferenceTop );
            //add the item on the bottom of the current one
            index = i;
            //console.log("Index2: " + index);
          }
        } 
        //place it on the bottom of the element that the user drop the block
        top = minDifferenceTop; 
        //change the order of the commands after it 
        moveOrderDown(index + 1);
       } else {
         //place it on the bottom of the last element
        top = minDifferenceTop + heightB/2;
       }
        
      idc = id;
      setId(idc += 1);
      //console.log("Top " + top);
    
      // create new command object 
      const c = new  CommandModel(idc, index, name, category, top, select);
      
      //add command at the list
      commands.splice(index, 0, c);
       
       
      }
      //console.log(commands);
       //get the commands with the position based on their order
       let  cmd = drawCommands();
       props.model.setCommands([...cmd])
    }
    
    function onDropDelete(ev) {
      let id = ev.dataTransfer.getData("id");
      //console.log("id:"+ id);
      const bl = commands.find(element => element.id == id);
      //console.log("bl.name:" + bl.name + bl.id);
      
      const index = commands.indexOf(bl);
      commands.splice(index, 1);
      moveOrderUp(index+1)
      const cmd = drawCommands();
    
      //console.log(commands)

      props.model.setCommands([...cmd])
    }

    
    function insideCommand(c) {
      //check if the command is inside an if or loop block 
      let inside = false
      for(let i=1; i< c.order; i++){
        if( commands[i].name === 'If' || commands[i].name === 'Repeat'){
          inside = true;
        }
        if( commands[i].name === 'End If' || commands[i].name === 'End Repeat'){
          inside = false;
        }
      }
      if(c.name === 'End If' || c.name === 'End Repeat'){
        inside = false;
      }
      console.log(inside)
      return inside;
    } 
    
    function setBgColor(category) {
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
    
    
    function setBrColor(category) {
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

    function runCode(){
      moveUp(3);
      moveRight(1);
      //moveDown(1);
      //moveLeft(2);

    } 

    function moveUp(rows) {
        let id = null;
        const elem = document.getElementById("rocket");   
        let bottom = parseInt(rocketPosition.bottom);
        let afterBottom = parseInt(bottom + windowVariables.sqh * rows)
        clearInterval(id);
        id = setInterval(frame, 5);
        function frame() {
          if (bottom === afterBottom) {
            clearInterval(id);
          } else {
            bottom++; 
            elem.style.bottom = bottom + "px"; 
          }
        }
      }

      function moveDown(rows) {
        let id = null;
        const elem = document.getElementById("rocket");   
        let top = parseInt(rocketPosition.top);
        let afterTop = parseInt(top + windowVariables.sqh * rows)
        console.log("aftertop: " + afterTop)
        console.log("top: " + top)
        clearInterval(id);
        id = setInterval(frame, 5);
        function frame() {
          if (top === afterTop) {
            clearInterval(id);
          } else {
            top++; 
            elem.style.top = top + "px"; 
          }
        }
      }


      function moveRight(columns) {
        let id = null;
        const elem = document.getElementById("rocket");   
        let pos = parseInt(rocketPosition.left);
        //the position after the movement is equal to the current position plus the width of the columns that will move
        let afterPos =  parseInt(pos + windowVariables.sqw * columns);
        console.log("afterPos: " + afterPos)
        console.log("Pos: " + pos)
        clearInterval(id);
        id = setInterval(frame, 5);
        function frame() {
          if (pos === afterPos) {
            clearInterval(id);
          } else {
            pos++; 
            elem.style.left = pos + "px"; 
          }
        }
      }

      function moveLeft(columns) {
        let id = null;
        const elem = document.getElementById("rocket");   
        let pos = parseInt(rocketPosition.right);
        //the position after the movement is equal to the current position plus the width of the columns that will move
        let afterPos =  parseInt(pos + windowVariables.sqw * columns);
        console.log("afterPos: " + afterPos)
        console.log("Pos: " + pos)
        clearInterval(id);
        id = setInterval(frame, 5);
        function frame() {
          if (pos === afterPos) {
            clearInterval(id);
          } else {
            pos++; 
            elem.style.right = pos + "px"; 
          }
        }
      }

    return (
        <CodingView 
            blocks = {blocks}
            commands = {commands}
            onDragOverDelete = {(e) => onDragOverDelete(e)} //command
            insideCommand = {(c) => insideCommand(c)} //command
            setBgColor = {(category)=>setBgColor(category)} //command
            setBrColor = {(category)=>setBrColor(category)} //command
            onDrop = {(e) => onDrop(e)}
            onDragOver = {(e) => onDragOver(e)} 
            onDropDelete = {(e) => onDropDelete(e)}
            onDragStart = {(ev, id) => onDragStart(ev, id)} 
            onDragStartDelete = {(ev, id) => onDragStartDelete(ev, id)}
            myMove = {() =>  runCode()}
        />
    ); 

}

export default CodingPresenter;