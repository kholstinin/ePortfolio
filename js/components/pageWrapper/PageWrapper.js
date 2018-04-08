import React from 'react';
import styled from 'styled-components';

export const SWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid #000;
  padding: 0 15px;
  font-size: 18px;
`;

export default class PageWrapper extends React.Component {
  render() {
    return (
        <SWrapper>{this.props.children}</SWrapper>
    );
  }
}
