import React, { Component } from 'react';
import './App.css';
import Draggable from './components/Draggable.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Draggable x={100} y={200} />
        <Draggable x={200} y={300} />
        <Draggable x={300} y={400} />
      </div>
    );
  }
}

export default App;
