import React from 'react';
//import logo from './logo.png';
import logo from './logo.svg';
import './Wait.css';

function Wait() {
  return (
        <p> Please wait ... <img src={logo} className="App-logo" alt="logo" /></p>
  );
}

export default Wait;
