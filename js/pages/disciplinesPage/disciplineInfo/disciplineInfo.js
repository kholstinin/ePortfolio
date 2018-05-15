import React from 'react';

import Button from '../../../components/button/Button';

import {
  SDisciplineListWrapper,
  SDisciplineInfoWrapper,
  SDisciplineListItem,
  SDisciplineList,
  SColumnHeader,
  SColumn,
  SRow,
  SActionWrapper,
  SButtonsWrapper,
} from './styles';

import {printStudyType} from '../../../common/utils';

export default class GroupInfo extends React.Component {
  render() {
    const {disciplineInfo} = this.props;

    return (
        <SDisciplineInfoWrapper>
          {disciplineInfo && <SColumn>
            <SColumnHeader>Информация о дисциплине:</SColumnHeader>
            <SRow>Полное название дисциплины: {disciplineInfo.fullName}</SRow>
            <SRow>Сокращенное название
              дисциплины: {disciplineInfo.shortName}</SRow>
            <SRow>Преподаватель: {disciplineInfo.professor}</SRow>
            <SRow>Форма обучения: {printStudyType(disciplineInfo.type)}</SRow>
          </SColumn>}
          {disciplineInfo && disciplineInfo.works && <SDisciplineListWrapper>
            <SDisciplineList>
              {disciplineInfo.works.map((discipline, index) =>
                  <SDisciplineListItem key={index}>
                    {discipline.type}: {discipline.workNumbers.map(
                      (work, index) => <span key={index}>{work}
                        {index === discipline.workNumbers.length - 1 ?
                            null :
                            ' / '}
                      </span>)}
                  </SDisciplineListItem>)}
            </SDisciplineList>
            <SButtonsWrapper>
              <Button text='Изменить дисциплину'
                      onClick={this.props.editDiscipline}
              />
              <Button color='danger'
                      text='Удалить дисциплину'
                      onClick={() => this.props.removeDiscipline(
                          disciplineInfo.type)}
              />
            </SButtonsWrapper>
          </SDisciplineListWrapper>}
        </SDisciplineInfoWrapper>
    );
  }
}
