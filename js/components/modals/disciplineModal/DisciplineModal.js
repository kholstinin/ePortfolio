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

export default class DisciplineModal extends React.Component<TDisciplineModalProps, TDisciplineModalState> {
  constructor(props) {
    super(props);

    this.state = {
      fullName: '',
      shortName: '',
      type: 'fullTime',
      practical: '',
      laboratory: '',
      course: false,
      independent: '',
    };
  }

  render() {
    return (
        <div>
          <SModalHeader>Данные для дисциплины</SModalHeader>
          <SColumn>
            <SRow>
              <SLabel>Полное название дисциплины:</SLabel>
              <SInput width={200}
                      value={this.state.fullName}
                      onChange={(e) => this.setState(
                          {fullName: e.target.value})}/>
            </SRow>
            <SRow>
              <SLabel>Сокращенное название дисциплины:</SLabel>
              <SInput width={200}
                      value={this.state.shortName}
                      onChange={(e) => this.setState(
                          {shortName: e.target.value})}/>
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
              <SInput width={200}
                      value={this.state.practical}
                      onChange={(e) => this.setState(
                          {practical: e.target.value})}/>
            </SRow>
            <SRow>
              <SLabel>Лабораторные работы:</SLabel>
              <SInput width={200}
                      value={this.state.laboratory}
                      onChange={(e) => this.setState(
                          {laboratory: e.target.value})}/>
            </SRow>
            <SRow>
              <SLabel>Самостоятельные работы:</SLabel>
              <SInput width={200}
                      value={this.state.independent}
                      onChange={(e) => this.setState(
                          {independent: e.target.value})}/>
            </SRow>
            <SRow>
              <SLabel>Курсовая работа:</SLabel>
              <SSelectInputWrapper>
                <SelectInput
                    options={[
                      {value: false, label: 'Нет'},
                      {value: true, label: 'Есть'},
                    ]}
                    value={this.state.course}
                    onItemPress={(course) => this.setState({course})}/>
              </SSelectInputWrapper>
            </SRow>
          </SColumn>
          <SButtonWrapper><Button text='Добавить дисциплину'
                                  onClick={this.onAddClick}/>
          </SButtonWrapper>
        </div>);
  }

  serializeDiscipline(): TDisciplineInfo {
    const {
      fullName,
      shortName,
      type,
      practical,
      laboratory,
      course,
      independent,
    } = this.state;

    const disciplineInfo = {
      fullName,
      shortName,
      type,
      works: [],
    };

    const disciplines = {practical, laboratory, independent};
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

    if (course) {
      disciplineInfo.works.push(getWorkObj('course', ['1']));
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
    this.props.onAddClick(this.serializeDiscipline());
    this.props.closeModal();
  };
}