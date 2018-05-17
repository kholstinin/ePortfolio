import React from 'react';
import styled from 'styled-components';
import openWorks from '../../common/openPdfModal';

import SBoardItem from './BoardItem';
import {dangerColor} from '../../common/palette';


function getTextColor(props) {
  if (props.wrong) {
    return dangerColor;
  }

  if (props.verified === false || props.isDone === false) {
    return '#ffd600  ';
  }

  return '#43a047';
}

const WorkFile = SBoardItem.extend`
  margin-bottom: 2px;
  color: ${props => getTextColor(props)}
  padding-left: 60px;
`;

export default class WorkType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  render() {
    const {workFile} = this.props;

    if (workFile.err) {
      return null;
    }

    return <div>
      <WorkFile
          wrong={workFile.wrong}
          verified={workFile.verified}
          onClick={this.onWorkClick}>
        {workFile.name}
      </WorkFile>
    </div>;
  }

  onWorkClick = () => {
    const {workFile} = this.props;
    if (!workFile.verified) {
      openWorks([{path: workFile.path, disciplineFullName: workFile.disciplineFullName}], [
        {
          groupName: workFile.groupName,
          fullName: workFile.studentFullName,
        },
      ])
    }
  }
}