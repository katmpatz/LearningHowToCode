import React from 'react';
import '../block/blockPresenter';

function CommandView(props){
    return(
        <div key={props.id} style={{top: props.top, left: props.left, position: 'absolute'}}>
             <div className="command"
                style = {{backgroundColor: props.bgcolor, borderColor: props.brcolor}}>
                {props.name}
            </div>
          </div>
        
    );
}

export default CommandView; 