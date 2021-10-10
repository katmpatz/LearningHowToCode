import React from 'react';
import MainView from 'MainView';

function MainPresenter(){
    state = {
        blocks: [
            {name:"Move Up",category:"wip"},
            {name:"Move Down", category:"wip"},
            {name:"Move Right", category:"wip"},
            {name:"Move Left", category:"wip"}
          ],
        commands: [],
        odrerIndex: 0,
    }

    onDragStart = (ev, id) => {
        ev.dataTransfer.setData("id", id);
    }
    
    onDragOver = (ev) => {
        ev.preventDefault();
    }
    
    onDrop = (ev, action) => {
       let id = ev.dataTransfer.getData("id");
    
       const bl = this.state.blocks.find(element => element.name === id);
      
       this.state.commands.push(bl);
       //this.state.commands.slice(-1)[0].order = this.state.odrerIndex + 1;
      console.log(this.state.commands);
       
    
       var commands = this.state.commands;
    
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

    return (
        <MainView 
        name = {name} 
        category = {category}
        bgcolor = {bgcolor}
        brcolor = {brcolor}
        onDragStart = {(ev, id) => onDragStart(ev, id)}
        onDragOver = {(ev) => onDragOver(ev)}
        />
    ); 

}

export default MainPresenter;