import React from 'react';
import MainView from './MainView';

function MainPresenter(props){
  
    return (
        <MainView model = {props.model}/>
    ); 

}

export default MainPresenter;