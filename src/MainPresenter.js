import React from 'react';
import CodingPresenter from './coding/codingPresenter';
import OutputPresenter from './output/outputPresenter';

function MainPresenter(){
  
    return (
      <div className="main-grid">
          <CodingPresenter/>
          <OutputPresenter/>
      </div>
    ); 

}

export default MainPresenter;