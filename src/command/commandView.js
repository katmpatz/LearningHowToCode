import React from 'react';
import '../block/blockPresenter';

function CommandView(props){
    return(
        <div className="command">
            <Block name={props.name} category={props.category}/>
        </div>
    );
}

export default CommandView;