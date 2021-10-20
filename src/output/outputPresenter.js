import React from 'react';
import OutputView from './outputView';
import useModelProperty from '../customHook';
import { useState, useEffect } from 'react';

function OutputPresenter(props){
    const windowVariables = useModelProperty(props.model, "windowVariables");
    const rocketPosition = useModelProperty(props.model, "rocketPosition");
    const charactersList = useModelProperty(props.model, "charactersList");
    let rocketBottom = rocketPosition.bottom;

    useEffect(() => {
        rocketBottom = props.model.rocketPosition.bottom;
        // On mount shows "null"
    }, [rocketPosition]);


    return (
        <OutputView 
            model={props.model}
            characterList={charactersList} 
            rocketRight={props.model.rocketStartPositionRight(rocketPosition.row)}
            rocketBottom={rocketBottom}
            sqh={windowVariables.sqh} 
            sqw={windowVariables.sqw}  
            setRight={(row) => props.model.setRight(row)}
            setBottom={(column) => props.model.setBottom(column)}
        />
    ); 

}

export default OutputPresenter;