import React from 'react';
import CommandView from './commandView'; 

function Command(props){
    const [id, setId]= React.useState(props.id);
    const [name, setName]= React.useState(props.name);
    const [category, setCategory] = React.useState(props.category);
    const [order, setOrder] = React.useState(props.order);
    const [top, setTopP] = React.useState(props.top);
    const [select, setSelect] = React.useState([...props.select]);

     
    // React.useEffect(
    //     function(){
    //         setColor();
    //     }, []); // case 1, execute at creation


    // function setColor() {
    //     //set colors based on the category
    //     if(category === 'move') {
    //         setBgColor('#AA57A2');
    //         setBrColor('#313873');
    //     } else if(category === 'if' || category === 'ifEnd') {
    //         setBgColor('#FBBB40');
    //         setBrColor('#CF931E');
    //     } else if(category === 'loop' || category === 'loopEnd') {
    //         setBgColor('#40FBD9');
    //         setBrColor('#00B695');
    //     } 
    // }

    // function insideCommand(c) {
    //     //check if the command is inside an if or loop block  
    //     let inside = false
    //     for(let i=1; i< c.order; i++){
    //       if( commands[i].name == 'If' || commands[i].name == 'Repeat'){
    //         inside = true;
    //       }
    //       if( commands[i].name == 'End If' || commands[i].name == 'End Repeat'){
    //         inside = false;
    //       }
    //     }
    //     if(c.name == 'End If' || c.name == 'End Repeat'){
    //       inside = false;
    //     }
    //     return inside;
    //   } 
      
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
  

      function onDragOverDelete(ev) {
        ev.preventDefault();
        console.log("onDragOverDelete(ev) c ", ev)
      }
      
      function onDragStartDelete(ev, id) {
        ev.dataTransfer.setData("id", id);
        console.log("onDragStartDelete c ", ev)
      }


    return (
        <CommandView 
            name = {name} 
            category = {category}
            id = {id}
            order = {order}
            top = {top}
            select = {select}
            onDragStart = {(ev, id) => onDragStartDelete(ev, id)}
            onDragOver = {(e) => onDragOverDelete(e)} //command
            // insideCommand = {(category) => props.insideCommand(category)} //command
            setBgColor = {(category)=>setBgColor(category)} //command
            setBrColor = {(category)=>setBrColor(category)} //command
        />
    ); 

}

export default Command;