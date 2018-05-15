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
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  render() {
    const {work} = this.props;

    if (work.err) {
      return null;
    }

    return <div>
      <WorkItem onClick={this.onWorkClick}>
        {`${work.type} ${work.numberOfVerifiedWorks}/${work.numberOfWorks}`}
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