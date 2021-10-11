import React from 'react';
import './block.css';

function BlockView(props){
    return(
        <div    
        onDragStart = {(e) => props.onDragStart(e, props.name)}
                draggable
                className={props.name == "If" || props.name == "Repeat" ? "block-select" : "block"}
                style = {{backgroundColor: props.bgcolor, borderColor: props.brcolor}}
            >
                <span id="label">{props.name}</span>
                {props.select.length > 0 &&
                    <select id="select">
                        {props.select.map((x,y) => 
                          <option key={y} value={x}>{x}</option>
                        )}
                     </select>
                }

        </div>
    );
}

export default BlockView;