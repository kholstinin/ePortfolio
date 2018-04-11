import React from 'react';
import styled from 'styled-components';

type TSelectInputProps = {};

type TSelectInputState = {}

const selectHeight = 30;

const SSelectInput = styled.select`
  width: ${props => props.width ? props.width + 'px' : '100%'};
  cursor: pointer;
  display: inline-block;
  position: relative;
  font-size: 16px;
  color: $select-color;
  height: ${selectHeight};
`;

const SOption = styled.option`

`;

export default class SelectInput extends React.Component<TSelectInputProps, TSelectInputState> {
  render() {
    return (
        <SSelectInput width={this.props.width} value={this.props.value}
                      onChange={(e) => this.props.onItemPress(e.target.value)}>
          {this.props.options.map((option, index) =>
              <option value={option.value} key={index}>
                {option.label}
              </option>)}
        </SSelectInput>
    );
  }
}
