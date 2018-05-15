import React from 'react';
import styled from 'styled-components';

import Student from './Student';
import SBoardItem from './BoardItem';

const GroupItem = SBoardItem.extend`
  margin-bottom: 5px;
  color: #000;
  font-size: 20px;
`;

export default class Group extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };
  }

  render() {
    const {group} = this.props;

    if (group.err) {
      return null;
    }

    return (
        <div>
          <GroupItem error={!!group.err} onClick={this.onGroupClick}>
            {`${group.name} ${group.numberOfVerifiedWorks}/${group.numberOfWorks}`}
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