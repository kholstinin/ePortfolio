import React from 'react';
import styled from 'styled-components';

const SHeader = styled.div`
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  margin-bottom: 10px;
  text-align: center;
`;

export default class PageHeader extends React.Component {
  render() {
    return (
        <SHeader>{this.props.text}</SHeader>
    );
  }
}
