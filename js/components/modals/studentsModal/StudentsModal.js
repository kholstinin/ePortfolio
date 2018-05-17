import React from 'react';
import Button from '../../button/Button';

import Input from '../../input/Input';
import SelectInput from '../../selectInput/SelectInput';
import {
  getStudyTypes,
  splitStudent,
} from '../../../common/utils';

import {
  SModalHeader,
  SInputArea,
  SColumn,
  SRow,
  SLabel,
  SButtonWrapper
} from './styles';

import {TGroupModalProps, TGroupModalState} from './typings';
import type {TStudentFullName} from '../../../typings/StudentFullName';

export default class StudentsModal extends React.Component<TGroupModalProps, TGroupModalState> {
  constructor(props) {
    super(props);

    this.state = {
      groupName: '',
      students: '',
      profile: '',
      direction: '',
      studyType: 'fullTime',
    };
  }

  render() {
    return (
        <div>
          <SModalHeader>Введите данные группы</SModalHeader>
          <SColumn>
            <SRow>
              <SLabel>Название группы:</SLabel>
              <Input
                  value={this.state.groupName}
                  onChange={(e) => this.setState(
                      {groupName: e.target.value})}/>
            </SRow>
            <SRow>
              <SLabel>Профиль:</SLabel>
              <Input value={this.state.profile}
                     onChange={(e) => this.setState(
                         {profile: e.target.value})}/>
            </SRow>
            <SRow>
              <SLabel>Направление:</SLabel>
              <Input
                  value={this.state.direction}
                  onChange={(e) => this.setState(
                      {direction: e.target.value})}/>
            </SRow>
            <SRow>
              <SLabel>Форма обучения:</SLabel>
              <SelectInput
                  width={100}
                  options={getStudyTypes()}
                  value={this.state.studyType}
                  onItemPress={(studyType) => this.setState({studyType})}/>
            </SRow>
          </SColumn>
          <SModalHeader>
            Добавьте студентов (ФИО, разделять пробелом, каждый с новой строчки)
          </SModalHeader>
          <SInputArea text={this.state.students}
                      onChange={(e) => this.setState(
                          {students: e.target.value})}/>
          <SButtonWrapper>
            <Button text='Добавить группу' onClick={this.onAddClick}/>
          </SButtonWrapper>
        </div>);
  }

  serializeStudents = (): Array<TStudentFullName> => {
    const {students} = this.state;
    let arrOfFullNames = students.split('\n');
    arrOfFullNames = arrOfFullNames.filter(item => item !== '');
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