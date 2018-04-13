import React from 'react';
import styled from 'styled-components';

import {getStudentName, printStudyType} from '../../../common/utils';

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

import {
  SStudentsListWrapper,
  SGroupInfoWrapper,
  SStudentsList,
  SStudentsListItem,
} from './styles';

export default class GroupInfo extends React.Component {
  render() {
    const {group} = this.props;
    if (!group) {
      return <SGroupInfoWrapper/>
    }

    const students = group.students;

    return (
        <SGroupInfoWrapper>
          {students ? <div>
            <SColumn>
              <SColumnHeader>Информация о группе:</SColumnHeader>
              <SRow>Профиль {group.profile}</SRow>
              <SRow>Направление {group.direction}</SRow>
              <SRow>Отделение {printStudyType(group.studyType)} <span onClick={() => this.props.changeField('type', 'Очное')}>Изменить</span></SRow>
            </SColumn>
            <SStudentsListWrapper>
              <SStudentsList>
                Список студентов
                {students.map(
                    (student, index) =>
                        <SStudentsListItem key={index}>
                          <span>
                            {`${index + 1}. ${getStudentName(student)}`}
                              </span>
                          <SActionWrapper onClick={this.props.editStudent}>
                            Изменить
                          </SActionWrapper>
                          <SActionWrapper
                              onClick={() => this.props.removeStudent(student)}>
                            Удалить
                          </SActionWrapper>
                        </SStudentsListItem>)}
                <div onClick={() => this.props.addStudent(
                    'Никитин Андрей Акакевич')}>Добавить студента
                </div>
                <div onClick={() => this.props.removeGroup()}>Удалить
                  группу
                </div>
              </SStudentsList>
            </SStudentsListWrapper>
          </div> : null}
        </SGroupInfoWrapper>
    );
  }
}
