import React from 'react';
import styled from 'styled-components';

import studyTypes from '../../../../data/studyType';

import {
  SDisciplineListWrapper,
  SDisciplineInfoWrapper,
  SDisciplineListItem,
  SDisciplineList,
} from './styles';

const SColumnHeader = styled.div`
  margin-bottom: 10px;
`;

const SColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const SRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const SActionWrapper = styled.span`
  margin-left: 15px;
  cursor: pointer;
  
  &:hover {
    color: red;  
  }
`;

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
            <SRow>Форма обучения: {studyTypes[disciplineInfo.type]}</SRow>
          </SColumn>}
          {disciplineInfo && disciplineInfo.works && <SDisciplineListWrapper>
            <SDisciplineList>
              {disciplineInfo.works.map((discipline, index) =>
                  <SDisciplineListItem key={index}>
                    {discipline.type}: {discipline.workNumbers.map(
                      (work, index) => <span key={index}>{work}
                        {index === discipline.workNumbers.length - 1 ?
                            null :
                            ', '}
                      </span>)}
                  </SDisciplineListItem>)}
            </SDisciplineList>
          </SDisciplineListWrapper>}
        </SDisciplineInfoWrapper>
    );
  }
}
