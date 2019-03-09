import React, { Component } from 'react';
import Draggable, { withDraggable } from './components/Draggable.jsx';
import Square from './components/Square.jsx';

const DraggableSquare = withDraggable(Square);

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* Render a precomposed component decorated with draggable capabilities */}
        <DraggableSquare x={100} y={100} />

        {/* Wrap any child component in a Draggable to give it draggable capabilities */}
        <Draggable x={200} y={100}>
          <Square />
        </Draggable>

        {/* Use child as a function pattern to let the consumer decide what to do during state changes */}
        <Draggable x={300} y={100}>
          {({ style, ref, isDragging }) => {
            return (
              <Square
                style={style}
                ref={ref}
                color={isDragging ? '#4286f4' : '#f44141'}
              />
            );
          }}
        </Draggable>
      </div>
    );
  }
}

export default App;
