import styled from '@emotion/styled';
import React from 'react';

const Div = styled.div`
  width: 30px;
  height: 30px;
  background-color: red;
  border: solid 3px transparent;
`;

export default class Square extends React.Component {
  render() {
    const { color, borderColor, style } = this.props;
    const mergedStyles = {
      ...style,
      ...{
        backgroundColor: color,
        borderColor: borderColor
      }
    };
    return <Div {...this.props} style={mergedStyles} />;
  }
}
