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

export const SContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  font-size: 18px;
`;

export class Container extends React.Component {
  render() {
    return (
        <SContainer>{this.props.children}</SContainer>
    );
  }
}

export const SPageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: ${contentHeight}px;
  font-size: 18px;
  padding: 0 ${props => props.noPadding ? 0 : 30}px;
`;

export class PageWrapper extends React.Component {
  render() {
    return (
        <SPageWrapper noPadding={this.props.noPadding}>{this.props.children}</SPageWrapper>
    );
  }
}

export const SPageContent = styled.div`
  display: flex;
  flex-direction: row;
  height: 660px;
`;

export const SPageControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 80px;
  padding: 0 ${props => props.padding ? props.padding + 'px' : 0}
    
  & > * {
    margin-right: 15px;
  }
`;