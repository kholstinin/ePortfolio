import React from 'react';
import styled from 'styled-components';

import Student from './Student';

const GroupItem = styled.div`
  font-size: 15px;
  margin-bottom: 5px;
  color: #000;
`;

export default class Group extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
    };
  }

  render() {
    const {group} = this.props;
    return (
        <div>
          <GroupItem onClick={this.onGroupClick}>
            {group.groupName}
          </GroupItem>
          {this.state.expanded && Group.renderStudents(group.students)}
        </div>);
  }

  onGroupClick = () => {
    this.setState({expanded: !this.state.expanded});
  };

  static renderStudents(arr) {
    return arr.map(
        (student, index) => <Student key={index} student={student}/>);
  }
}