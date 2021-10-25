import React from 'react';
import CodingPresenter from './coding/codingPresenter';
import OutputPresenter from './output/outputPresenter';

function MainView(props){
  
    return (
      <div className="main-grid">
          <CodingPresenter model = {props.model}/>
          <OutputPresenter model = {props.model}/>
      </div>
    ); 

}

export default MainView;