import React from 'react';
import CommandView from './commandView';

function Command(props){
    const [id, setId]= React.useState(props.id);
    const [name, setName]= React.useState(props.name);
    const [category, setCategory] = React.useState(props.category);
    const [order, setOrder] = React.useState(props.order);
    const [top, setTopP] = React.useState(props.top);
    const [left, setLeftP] = React.useState(props.left);
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


    return (
        <CommandView 
            name = {name} 
            category = {category}
            id = {id}
            order = {order}
            top = {top}
            left={left}
            bgcolor = {bgcolor}
            brcolor = {brcolor}
        />
    ); 

}

export default Command;