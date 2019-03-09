import React from 'react';
import ReactDOM from 'react-dom';
import { fromEvent, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { getComponentDisplayName } from '../lib/util';

export default class Draggable extends React.Component {
  state = {
    x: this.props.x,
    y: this.props.y
  };

  constructor(props) {
    super(props);
    this.subject = new Subject();
    this.listenToDragEvents();
  }

  listenToDragEvents = () => {
    const mouseMoveEvents = this.getMouseMoveEvents();
    mouseMoveEvents.forEach(this.onMouseMoveEvent.bind(this));
  };

  getMouseMoveEvents = () => {
    /**
     * Create a observable that when pushed a dom element
     * binds a mousedown event handler to the element
     * and emits any events from the handler.
     */
    const mouseDown = switchMap((element) => {
      return fromEvent(element, 'mousedown');
    });

    /**
     * Create a observable that emits mousemove events from a event
     * listener on the document.
     */
    const mouseMoves = fromEvent(document, 'mousemove');

    /**
     * Create a observable that emits mouseup events from a event
     * listener on the document.
     */
    const mouseUps = fromEvent(document, 'mouseup');

    /**
     * Create a observable that emits mouse move events UNTIL the 'mouseup'
     * observable emits its first event.
     */
    const mouseMovesUntilMouseUp = switchMap(() => {
      return mouseMoves.pipe(takeUntil(mouseUps));
    });

    /**
     * Subject is pushed values (dom elements) from the invocation of `this.subject.next(element)` in
     * the implementation of this.ref;
     */
    const mouseDrags = this.subject.pipe(
      mouseDown,
      mouseMovesUntilMouseUp
    );

    return mouseDrags;
  };

  onMouseMoveEvent = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  };

  setRef = (component) => {
    if (!component) return;

    const element = ReactDOM.findDOMNode(component);

    /**
     * Emit the new element everytime React gives us one.
     */
    this.subject.next(element);
  };

  render() {
    const { x, y } = this.state;

    const style = {
      position: 'absolute',
      top: `${y}px`,
      left: `${x}px`
    };

    return React.cloneElement(this.props.children, {
      style,
      ref: this.setRef.bind(this)
    });
  }
}

export const withDraggable = (WrappedComponent) => {
  class WithDraggable extends React.Component {
    render() {
      const props = this.props;
      return (
        <Draggable {...props}>
          <WrappedComponent {...props} />
        </Draggable>
      );
    }
  }

  const componentName = getComponentDisplayName(WrappedComponent);

  WithDraggable.displayName = `WithDraggable(${componentName})`;

  return WithDraggable;
};
