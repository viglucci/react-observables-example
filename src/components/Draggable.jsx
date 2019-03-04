import styled from '@emotion/styled';
import React from 'react';
import { fromEvent, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

export default class Dragable extends React.Component {
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
    return this.subject.pipe(
      switchMap(this.listenToMouseDown.bind(this)),
      switchMap(this.listenToMouseMoveUntilMoseUp.bind(this))
    );
  };

  listenToMouseDown = (element) => {
    return fromEvent(element, 'mousedown');
  };

  listenToMouseMoveUntilMoseUp = (_) => {
    const documentMouseMoves = fromEvent(document, 'mousemove');
    const documentMouseUps = fromEvent(document, 'mouseup');
    return documentMouseMoves.pipe(takeUntil(documentMouseUps));
  };

  onMouseMoveEvent = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  };

  ref = (element) => {
    if (element) {
      this.subject.next(element);
    }
  };

  render() {
    const { x, y } = this.state;
    const Container = styled.div`
      width: 30px;
      height: 30px;
      background: red;
      position: absolute;
      cursor: -webkit-grab;
    `;

    const styles = {
      top: `${y}px`,
      left: `${x}px`
    };

    return <Container ref={this.ref} style={styles} />;
  }
}
