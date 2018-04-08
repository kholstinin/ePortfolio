import React from 'react';
import styled from 'styled-components';

import openWorks from '../../common/openPdfModal';

import SBoardItem from './BoardItem';

const WorkFile = SBoardItem.extend`
  margin-bottom: 2px;
  padding-left: 60px;
`;

export default class WorkType extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
    };
  }

  render() {
    const {workFile} = this.props;
    return <div>
      <WorkFile verified={workFile.verified} onClick={() => openWorks([this.props.workFile.path])}>
        {workFile.name}
      </WorkFile>
    </div>;
  }
}