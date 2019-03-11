import React from 'react';
import ReactDOM from 'react-dom';
import { fromEvent, Subject } from 'rxjs';
import { switchMap, takeUntil, map } from 'rxjs/operators';
import { getComponentDisplayName } from '../lib/util';

export default class Draggable extends React.Component {
  state = {
    isDragging: false,
    isDraggingStarting: false,
    x: this.props.x,
    y: this.props.y
  };

  newRefSubject = null;

  mouseMoveSubscription = null;

  elementMouseDown$ = null;

  documentMouseMoves$ = null;

  documentMouseUp$ = null;

  documentMouseMovesUntilMouseUp$ = null;

  constructor(props) {
    super(props);
    this.newRefSubject = new Subject();
    this.subscribe();
  }

  subscribe = () => {
    this.documentMouseMoves$ = fromEvent(document, 'mousemove');

    this.documentMouseUp$ = fromEvent(document, 'mouseup');

    this.elementMouseDown$ = this.newRefSubject.pipe(
      switchMap((element) => {
        return fromEvent(element, 'mousedown');
      })
    );

    this.documentMouseMovesUntilMouseUp$ = this.documentMouseMoves$.pipe(
      map((e) => ({
        x: e.clientX,
        y: e.clientY
      })),
      takeUntil(this.documentMouseUp$)
    );

    this.subscribeToMouseDown();
  };

  subscribeToMouseDown() {
    this.elementMouseDown$.subscribe({
      next: (e) => {
        this.setState({
          isDragging: false,
          isDraggingStarting: true
        });
        this.subscribeToMouseMove();
      }
    });
  }

  subscribeToMouseMove() {
    if (this.mouseMoveSubscription) {
      this.mouseMoveSubscription.unsubscribe();
    }

    this.mouseMoveSubscription = this.documentMouseMovesUntilMouseUp$.subscribe(
      {
        next: (e) => this.onDragEvent(e),
        complete: () => this.onDragCompleteEvent()
      }
    );
  }

  onDragEvent(e) {
    this.setState({
      isDragging: true,
      isDraggingStarting: false,
      ...e
    });
  }

  onDragCompleteEvent() {
    this.setState({
      isDragging: false,
      isDraggingStarting: false
    });
  }

  setRef = (component) => {
    if (!component) return;

    const element = ReactDOM.findDOMNode(component);

    this.newRefSubject.next(element);
  };

  render() {
    const { x, y, isDragging, isDraggingStarting } = this.state;

    const style = {
      position: 'absolute',
      top: `${y}px`,
      left: `${x}px`
    };

    if (typeof this.props.children === 'function') {
      return this.props.children({
        style,
        ref: this.setRef.bind(this),
        x,
        y,
        isDragging,
        isDraggingStarting
      });
    }

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
