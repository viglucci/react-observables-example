import styled from '@emotion/styled';
import React from 'react';

const Div = styled.div`
  width: 30px;
  height: 30px;
  background: red;
`;

export default class Square extends React.Component {
  render() {
    return <Div {...this.props} />;
  }
}
