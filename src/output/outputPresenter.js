import React from 'react';
import OutputView from './outputView';
import useModelProperty from '../customHook';

function OutputPresenter(props){
    const windowVariables = useModelProperty(props.model, "windowVariables");
    const rocketPosition = useModelProperty(props.model, "rocketPosition");
    const charactersList = useModelProperty(props.model, "charactersList");

    return (
        <OutputView 
            characterList={charactersList} 
            rocketRight={rocketPosition.right}
            rocketBottom={rocketPosition.bottom}
            sqh={windowVariables.sqh} 
            sqw={windowVariables.sqw}  
            setRight={(row) => props.model.setRight(row)}
            setBottom={(column) => props.model.setBottom(column)}
        />
    ); 

}

export default OutputPresenter;