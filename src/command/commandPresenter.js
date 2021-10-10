import React from 'react';
import CommandView from './commandView';

function Command(props){
    const [id, setId]= React.useState(props.id);
    const [name, setName]= React.useState(props.name);
    const [category, setCategory] = React.useState(props.category);
    const [bottomP, setBottomP] = React.useState(props.bottomP);
    const [leftP, setLeftP] = React.useState(props.leftP);

    
    React.useEffect(
        function(){
            // setColor();
        }, []); // case 1, execute at creation


    return (
        <CommandView 
            name = {name} 
            category = {category}
        />
    ); 

}

export default Command;