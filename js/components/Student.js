import React from 'react';
import styled from 'styled-components';

import Discipline from './Disciplines';

const StudentItem = styled.div`
  font-size: 15px;
  margin-bottom: 2px;
  color: #000;
  padding-left: 20px;
`;

export default class Student extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
    };
  }

  render() {
    const {student} = this.props;
    return <div>
      <StudentItem onClick={this.onStudentClick}>{student.studentName}</StudentItem>
      {this.state.expanded && Student.renderDisciplines(student.disciplines)}
    </div>;
  }

  onStudentClick = () => {
    this.setState({expanded: !this.state.expanded});
  };

  static renderDisciplines(arr) {
    return arr.map(
        (discipline, index) => <Discipline key={index} discipline={discipline}/>);
  }
}