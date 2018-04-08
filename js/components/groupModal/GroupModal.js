import React from 'react';
import styled from 'styled-components';
import Button from '../../components/button/Button';

const modalHaderHeight = 40;
const SModalHeader = styled.div`
  width: 100%;
  height: ${modalHaderHeight}px;
  line-height: ${modalHaderHeight}px;
  font-size: 15px;
  text-align: center;
  margin: 10px 0;
`;

const SInputArea = styled.textarea`
  width: 100%;
  height: 300px;
`;

const SColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const SRow = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
`;

const SLabel = styled.div`
  width: 150px;
  margin-right: 5px;
`;

export default class GroupModal extends React.Component {
  constructor() {
    super();
    this.state = {
      groupName: '',
      students: '',
      faculty: '',
      direction: '',
    };
  }

  render() {
    return (
        <div>
          <SModalHeader>Добавьте группу</SModalHeader>
          <SColumn>
            <SRow>
              <SLabel>Название группы:</SLabel>
              <input
                  value={this.state.groupName}
                  onChange={(e) => this.setState(
                      {groupName: e.target.value})}/>
            </SRow>
            <SRow>
              <SLabel>Факультет:</SLabel>
              <input value={this.state.faculty}
                     onChange={(e) => this.setState(
                         {faculty: e.target.value})}/>
            </SRow>
            <SRow>
              <SLabel>Направление:</SLabel>
              <input
                  value={this.state.direction}
                  onChange={(e) => this.setState(
                      {direction: e.target.value})}/>
            </SRow>
          </SColumn>
          <SModalHeader>
            Добавьте студентов (ФИО, каждый с новой строчки, разделять пробелом)
          </SModalHeader>
          <SInputArea text={this.state.students}
                      onChange={(e) => this.setState(
                          {students: e.target.value})}/>
          <Button text='Добавить группу' onClick={this.onAddClick}/>
          <Button text='serialize' onClick={this.serialize}/>
        </div>);
  }

  serializeStudents = () => {
    const {students} = this.state;
    const arrOfStudents = students.split('\n');

    return arrOfStudents.sort();
    // TODO split by space, but if length 0 try \r
  };

  onAddClick = () => {
    const students = this.serializeStudents(this.state.students);
    this.props.addGroup({...this.state, students});
    this.props.closeModal();
  };
}