import React from 'react';
import styled from 'styled-components';

import {headerHeight, contentHeight} from '../../common/global';
import {pageColor} from '../../common/palette';

const SHeader = styled.div`
  position: relative;
  background-color: ${pageColor};
  color: #fff;
  padding-left: 20px;
  width: 100%;
  height: ${headerHeight}px;
  line-height: ${headerHeight}px;
  font-size: 30px;
`;

const Square = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${pageColor};
  position: absolute;
  bottom: -40px;
  right: 0;
  overflow: hidden;
  
  &:after {
    content: "";
    position: absolute;
    width: 80px;
    height: 80px;
    background-color: #fff;
    border-radius: 80px;
    left: -40px;
    bottom: -40px;
  }
`;

export class PageHeader extends React.Component {
  render() {
    return (
        <SHeader>{this.props.text} <Square/></SHeader>
    );
  }
}

export const SContent = styled.div`
  position: relative;
  width: 100%;
  height: ${contentHeight}px;
  font-size: 18px;
  padding: 0 ${props => props.noPadding ? 0 : 30}px;
`;

export class PageContent extends React.Component {
  render() {
    return (
        <SContent noPadding={this.props.noPadding}>{this.props.children}</SContent>
    );
  }
}

export const SWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  font-size: 18px;
`;

export class PageWrapper extends React.Component {
  render() {
    return (
        <SWrapper>{this.props.children}</SWrapper>
    );
  }
}


