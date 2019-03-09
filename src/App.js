import React, { Component } from 'react';
import './App.css';

import Square from './components/Square.jsx';
import Draggable, { withDraggable } from './components/Draggable.jsx';

const DraggableSquare = withDraggable(Square);

class App extends Component {
  render() {
    return (
      <div className="App">
        <DraggableSquare x={100} y={100} />
        <Draggable x={200} y={100}>
          <Square />
        </Draggable>
      </div>
    );
  }
}

export default App;
