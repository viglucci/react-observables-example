import styled from '@emotion/styled';
import React from 'react';

const Div = styled.div`
  width: 30px;
  height: 30px;
  background-color: red;
`;

export default class Square extends React.Component {
  render() {
    const { color, style } = this.props;
    const mergedStyles = {
      ...style,
      ...{
        backgroundColor: color
      }
    };
    return <Div {...this.props} style={mergedStyles} />;
  }
}
