import React from 'react';

import Button from '../../button/Button';
import SInput from '../../../components/input/Input';
import {
  SModalHeader,
  SColumn,
  SRow,
  SLabel,
  SSelectInputWrapper,
  SButtonWrapper,
} from './styles';

import {getWorkObj, getStudyTypes} from '../../../common/utils';
import SelectInput from '../../selectInput/SelectInput';

import type {TDisciplineInfo} from '../../../typings/Discipline';
import type {TDisciplineModalProps, TDisciplineModalState} from './typings';
import Works from '../../../pages/disciplinesPage/Works';

const inputWidth = 300;

export default class DisciplineModal extends React.Component<TDisciplineModalProps, TDisciplineModalState> {
  constructor(props) {
    super(props);

    if (props.disciplineInfo.fullName) {
      const works = new Works(props.disciplineInfo.works);

      this.state = {
        fullName: props.disciplineInfo.fullName,
        professor: props.disciplineInfo.professor,
        shortName: props.disciplineInfo.shortName,
        type: props.disciplineInfo.type,

        practical: works.getPracticalWorkNumbers(),
        laboratory: works.getLaboratoryWorkNumbers(),
        courseWork: works.getCourseWork(),
        courseProject: works.getCourseProject(),
        independent: works.getIndependentWorkNumbers(),
        homework: works.getHomeworkNumbers(),
      };
    } else {
      this.state = {
        fullName: '',
        professor: '',
        shortName: '',
        type: 'fullTime',

        practical: '',
        laboratory: '',
        courseWork: false,
        courseProject: false,
        independent: '',
        homework: '',
      };
    }
  }

  render() {
    return (
        <div>
          <SModalHeader>Информация о дисциплине</SModalHeader>
          <SColumn>
            <SRow>
              <SLabel>Полное название дисциплины:</SLabel>
              <SInput width={inputWidth}
                      value={this.state.fullName}
                      onChange={(e) => this.setState(
                          {fullName: e.target.value})}/>
            </SRow>
            <SRow>
              <SLabel>Сокращенное название дисциплины:</SLabel>
              <SInput width={inputWidth}
                      value={this.state.shortName}
                      onChange={(e) => this.setState(
                          {shortName: e.target.value})}/>
            </SRow>
            <SRow>
              <SLabel>Преподаватель (ФИО полностью):</SLabel>
              <SInput width={inputWidth}
                      value={this.state.professor}
                      onChange={(e) => this.setState(
                          {professor: e.target.value})}/>
            </SRow>
            <SRow>
              <SLabel>Форма обучения:</SLabel>
              <SSelectInputWrapper>
                <SelectInput
                    options={getStudyTypes()}
                    value={this.state.type}
                    onItemPress={(type) => this.setState({type})}/>
              </SSelectInputWrapper>
            </SRow>
            <SRow>
              <SLabel>Практические работы:</SLabel>
              <SInput width={inputWidth}
                      value={this.state.practical}
                      onChange={(e) => this.setState(
                          {practical: e.target.value})}/>
            </SRow>
            <SRow>
              <SLabel>Лабораторные работы:</SLabel>
              <SInput width={inputWidth}
                      value={this.state.laboratory}
                      onChange={(e) => this.setState(
                          {laboratory: e.target.value})}/>
            </SRow>
            <SRow>
              <SLabel>Самостоятельные работы:</SLabel>
              <SInput width={inputWidth}
                      value={this.state.independent}
                      onChange={(e) => this.setState(
                          {independent: e.target.value})}/>
            </SRow>
            <SRow>
              <SLabel>Домашние контрольные работы:</SLabel>
              <SInput width={inputWidth}
                      value={this.state.homework}
                      onChange={(e) => this.setState(
                          {homework: e.target.value})}/>
            </SRow>
            <SRow>
              <SLabel>Курсовая работа:</SLabel>
              <SSelectInputWrapper>
                <SelectInput
                    options={[
                      {value: false, label: 'Нет'},
                      {value: true, label: 'Есть'},
                    ]}
                    value={this.state.courseWork}
                    onItemPress={(courseWork) => this.setState({courseWork})}/>
              </SSelectInputWrapper>
            </SRow>
            <SRow>
              <SLabel>Курсовой проект:</SLabel>
              <SSelectInputWrapper>
                <SelectInput
                    options={[
                      {value: false, label: 'Нет'},
                      {value: true, label: 'Есть'},
                    ]}
                    value={this.state.courseProject}
                    onItemPress={(courseProject) => this.setState(
                        {courseProject})}/>
              </SSelectInputWrapper>
            </SRow>
          </SColumn>
          <SButtonWrapper>
            <Button text={this.props.modalOperation}
                    onClick={this.onAddClick}/>
            <Button color='danger'
                    text='Отмена'
                    onClick={this.props.closeModal}/>
          </SButtonWrapper>
        </div>);
  }

  serializeDiscipline(): TDisciplineInfo {
    const {
      fullName,
      shortName,
      type,
      professor,

      practical,
      laboratory,
      courseWork,
      courseProject,
      homework,
      independent,
    } = this.state;

    const disciplineInfo = {
      fullName,
      professor,
      shortName,
      type,
      works: [],
    };

    const disciplines = {practical, laboratory, independent, homework};
    for (let key in disciplines) {
      if (disciplines.hasOwnProperty(key)) {

        const workNumbers = disciplines[key];
        if (workNumbers !== '') {
          const workType = key;
          const workNumbers = DisciplineModal.getWorksArr(disciplines[key]);

          disciplineInfo.works.push(getWorkObj(workType, workNumbers));
        }
      }
    }

    if (courseWork) {
      disciplineInfo.works.push(getWorkObj('courseWork', ['1']));
    }

    if (courseProject) {
      disciplineInfo.works.push(getWorkObj('courseProject', ['1']));
    }

    return disciplineInfo;
  }

  static getWorksArr(workNumbers: string): Array<string> {
    //todo add validations
    const works = workNumbers.trim().split(' ');

    if (works.length !== 1) {
      return works;
    } else {
      const generatedWorks = [];

      for (let i = 0; i < works[0]; i++) {
        generatedWorks.push(i + 1);
      }

      return generatedWorks;
    }
  }

  onAddClick = (): void => {
    this.props.clickAction(this.serializeDiscipline());
    this.props.closeModal();
  };
}