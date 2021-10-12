import '../Main.css';
import React, { Component } from 'react' ;
import rocket from '../img/Rocket_Panda.png';
import planet from '../img/Supermarket_Planet.png';

function OutputView(props) {
  return (
      <div className="output">
        <div style={{gridRow: 1, gridColumn: '1/6', alignSelf: 'end', borderBottom: '1px #d3c8c8 dashed'}}></div>
        <div style={{gridRow: 2, gridColumn: '1/6', alignSelf: 'end', borderBottom: '1px #d3c8c8 dashed'}}></div>
        <div style={{gridRow: 3, gridColumn: '1/6', alignSelf: 'end', borderBottom: '1px #d3c8c8 dashed'}}></div>
        <div style={{gridRow: 4, gridColumn: '1/6', alignSelf: 'end', borderBottom: '1px #d3c8c8 dashed'}}></div>
        <div style={{gridRow: '1/6', gridColumn: 1, justifySelf: 'end', borderRight: '1px #d3c8c8 dashed'}}></div>
        <div style={{gridRow: '1/6', gridColumn: 2, justifySelf: 'end', borderRight: '1px #d3c8c8 dashed'}}></div>
        <div style={{gridRow: '1/6', gridColumn: 3, justifySelf: 'end', borderRight: '1px #d3c8c8 dashed'}}></div>
        <div style={{gridRow: '1/6', gridColumn: 4, justifySelf: 'end', borderRight: '1px #d3c8c8 dashed'}}></div>
          <img src={planet} height="150" style={{position: 'absolute', top: 5, left: '74vw'}}/>
          <img id="rocket" src={rocket} height="150" style={{position: 'absolute', bottom: 0, left: '78vw'}}/>
      </div>
  );
}

export default OutputView;
