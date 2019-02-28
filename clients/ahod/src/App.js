import React, { Component } from 'react';
import logo from './logo.svg';
import {Footer} from "react-materialize";

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>

        <Footer copyrights="&copy 2015 Copyright Text"
  moreLinks={
    <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
  }
  links={
    <ul>
      <li><a className="grey-text text-lighten-3" href="#!">Link 1</a></li>
      <li><a className="grey-text text-lighten-3" href="#!">Link 2</a></li>
    </ul>
  }
  className='example'
>
    <h5 className="white-text">Footer Content</h5>
    <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
</Footer>;

      </div>
    );
  }
}

export default App;
