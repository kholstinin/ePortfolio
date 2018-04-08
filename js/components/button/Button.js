import React from 'react';
import styled from 'styled-components';

type ButtonProps = {
  onClick?: () => void,
  text: string,
}

const buttonHeight = 36;
const SButton = styled.button`
  margin: 0;
  padding: 0;
  border: 0;
  
  cursor: pointer;
  background-color: #2bbbad;
  position: relative;
  overflow: hidden;
  text-align: center;
  height: ${buttonHeight}px;
  line-height: ${buttonHeight}px;
  color: #fff;
  padding: 0 2rem;
  box-shadow: 0 3px 3px 0 rgba(0,0,0,0.14),0 1px 7px 0 rgba(0,0,0,0.12),0 3px 1px -1px rgba(0,0,0,0.2);
  border-radius: 2px;
`;

export default class Button extends React.Component<ButtonProps> {
  render() {
    return <SButton onClick={this.props.onClick || function() {
    }}>{this.props.text}</SButton>;
  }
}