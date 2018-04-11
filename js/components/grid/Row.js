import React from 'react';
import styled from 'styled-components';

const SRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export default class Row extends React.Component {
  render() {
    return (
        <SRow>{this.props.children}</SRow>
    )
  }
}