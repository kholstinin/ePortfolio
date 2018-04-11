import React from 'react';
import styled from 'styled-components';
import Button from '../../button/Button';

import SelectInput from '../../selectInput/SelectInput';
import {
  getStudyTypes,
  splitStudent,
} from '../../../common/utils';

const modalHeaderHeight = 40;
const SModalHeader = styled.div`
  width: 100%;
  height: ${modalHeaderHeight}px;
  line-height: ${modalHeaderHeight}px;
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

export default class AddGroupModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      groupName: '',
      students: '',
      profile: '',
      direction: '',
      type: '',
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
              <SLabel>Профиль:</SLabel>
              <input value={this.state.profile}
                     onChange={(e) => this.setState(
                         {profile: e.target.value})}/>
            </SRow>
            <SRow>
              <SLabel>Направление:</SLabel>
              <input
                  value={this.state.direction}
                  onChange={(e) => this.setState(
                      {direction: e.target.value})}/>
            </SRow>
            <SRow>
              <SLabel>Форма обучения:</SLabel>
              <SelectInput
                  width={100}
                  options={getStudyTypes()}
                  value={this.state.type}
                  onItemPress={(type) => this.setState({type})}/>
            </SRow>
          </SColumn>
          <SModalHeader>
            Добавьте студентов (ФИО, каждый с новой строчки, разделять пробелом)
          </SModalHeader>
          <SInputArea text={this.state.students}
                      onChange={(e) => this.setState(
                          {students: e.target.value})}/>
          <Button text='Добавить группу' onClick={this.onAddClick}/>
        </div>);
  }

  serializeStudents = () => {
    const {students} = this.state;
    const arrOfFullNames = students.split('\n');
    let arrOfStudents = [];

    //TODO Добавить больше валидаций

    if (students !== '') {
      arrOfStudents = arrOfFullNames.map(fullName => splitStudent(fullName));
    }

    return arrOfStudents;
  };

  onAddClick = () => {
    const students = this.serializeStudents(this.state.students);
    this.props.addGroup({...this.state, students});
    this.props.closeModal();
  };
}