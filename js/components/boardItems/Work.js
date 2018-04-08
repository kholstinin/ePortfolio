import React from 'react';
import styled from 'styled-components';

import WorkFile from './WorkFile';

import SBoardItem from './BoardItem';

const WorkItem = SBoardItem.extend`
  margin-bottom: 2px;
  color: #000;
  padding-left: 40px;
`;

export default class WorkType extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
    };
  }

  render() {
    const {work} = this.props;
    return <div>
      <WorkItem onClick={this.onWorkClick}>
        {work.type}
      </WorkItem>
      {this.state.expanded && WorkType.renderWorks(work.workFiles)}
    </div>;
  }

  onWorkClick = () => {
    this.setState({expanded: !this.state.expanded});
  };

  static renderWorks(arr) {
    return arr.map(
        (workFile, index) => <WorkFile key={index} workFile={workFile}/>);
  }
}