import React from 'react';
import styled from 'styled-components';

import Checkbox from './Checkbox';

const SWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
   
  & > * {
    margin-right: 10px;
  }
`;

export default class CheckboxWithLabel extends React.Component {
  render() {

    return (
          <SWrapper>
            <div>{this.props.label}</div>
            <Checkbox
                {...this.props}
            />
          </SWrapper>
    )
  }
}