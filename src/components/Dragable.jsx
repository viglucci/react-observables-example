import styled from '@emotion/styled';
import React from 'react';
import getElementsDrags from '../utils/getElementDrags';

export default class Dragable extends React.Component {
  state = {
    x: 100,
    y: 100
  };

  constructor(props) {
    super(props);
    this.ref = this.onNewRef.bind(this);
  }

  onNewRef = (element) => {
    if (element) {
      const stream = getElementsDrags(element);
      stream.forEach((e) => {
        this.setState({
          x: e.clientX,
          y: e.clientY
        });
      });
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
