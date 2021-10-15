import React from 'react';
import ReactDOM from 'react-dom';
import MainPresenter from './MainPresenter';
import MainModel from './mainModel';
import useModelProperty from './customHook';
import './index.css';
import './Main.css';
import reportWebVitals from './reportWebVitals';

const myModel = new MainModel();
console.log(myModel);

ReactDOM.render(
  <React.StrictMode>
    <MainPresenter model={myModel}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
