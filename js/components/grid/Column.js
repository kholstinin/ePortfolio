import React from 'react';
import styled from 'styled-components';

const SColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export default class Row extends React.Component {
  render() {
    return (
        <SColumn>{this.props.children}</SColumn>
    )
  }
}