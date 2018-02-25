import React from 'react';
import styled from 'styled-components';

const WorkItem = styled.div`
  font-size: 15px;
  margin-bottom: 2px;
  color: #000;
  padding-left: 40px;
`;

export default class Work extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
    };
  }

  render() {
    const {work} = this.props;
    return <div>
      <WorkItem onClick={this.openWork}>
        {work.workName}
      </WorkItem>
    </div>;
  }

  openWork = () => {
    //showWork();
  }
}