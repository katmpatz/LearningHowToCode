import React from 'react';
import './block.css';

function BlockView(props){
    return(
        <div    onDragStart = {(e) => props.onDragStart(e, props.name)}
                draggable
                className="block"
                style = {{backgroundColor: props.bgcolor, borderColor: props.brcolor}}
            >
                {props.name}
        </div>
    );
}

export default BlockView;