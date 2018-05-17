import React from 'react';
import styled from 'styled-components';
import {mainColor} from '../../common/palette';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';

const SWrapper = styled.div`
  width: 16px;
  height: 16px;
  display: inline-block;
  border-radius: 2px;
  background-color: #fff;
  border: 1px solid #000;
  cursor: pointer;
`;

export default class Checkbox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {value} = this.props;

    return (
        <SWrapper onClick={this.props.onChange}>
          {value && <FontAwesomeIcon
              icon="check"
              transform={{size: 14, x: -1, y: -2}}
              color={mainColor}
          />}
        </SWrapper>
    );
  }
}