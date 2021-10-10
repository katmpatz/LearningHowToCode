import React from 'react';
import BlockView from './blockView';

function Block(props){
    const [name, setName]= React.useState(props.name);
    const [category, setCategory] = React.useState(props.category);
    const [bgcolor, setBgColor] = React.useState('');
    const [brcolor, setBrColor] = React.useState('');
    
    React.useEffect(
        function(){
            setColor();
        }, []); // case 1, execute at creation


    function setColor() {
        //set colors based on the category
        if(category === 'move') {
            setBgColor('#AA57A2');
            setBrColor('#313873');
        } else if(category === 'if' || category === 'ifEnd') {
            setBgColor('#FBBB40');
            setBrColor('#CF931E');
        } else if(category === 'loop' || category === 'loopEnd') {
            setBgColor('#40FBD9');
            setBrColor('#00B695');
        } 
    }

    function onDragStart(ev, id) {
            ev.dataTransfer.setData("id", id);
    }


    return (
        <BlockView 
        name = {name} 
        category = {category}
        bgcolor = {bgcolor}
        brcolor = {brcolor}
        onDragStart = {(ev, id) => onDragStart(ev, id)}
        />
    ); 

}

export default Block;