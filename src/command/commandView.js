import React from 'react';

function CommandView(props){
    return(
        <div key={props.id} style={{top: props.top,  position: 'absolute'}} onDragOver={(e)=>props.onDragOver(e)} onDragStart={(e)=>props.onDragStart(e, props.id)}>
             <div className={props.name == "If" || props.name == "Repeat" ? "command-select" : "command"} 
             draggable
                style = {{backgroundColor: props.setBgColor(props.category), borderColor: props.setBrColor(props.category)}}>
                <span id="label">{props.name}</span>
                {props.select.length > 0 &&
                    <select id="select">
                        {props.select.map((x,y) => 
                          <option key={y} value={x}>{x}</option>
                        )}
                     </select>
                }
            </div>
          </div>
    );
}

export default CommandView; 