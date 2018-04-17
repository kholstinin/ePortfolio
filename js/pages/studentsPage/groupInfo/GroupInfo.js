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

import {
  STable,
  STableHeader,
  STableBody,
  STableCell,
  STableRow,
} from '../../../components/table/TableStyles';
import Button from '../../../components/button/Button';

import {
  SGroupInfoWrapper,
  SEditButton,
  SRemoveButton,
  SStudentsTableWrapper,
  SActionsWrapper,
  SStudentsTableRow,
  SFooterActions,
} from './styles';

type TGroupInfoProps = {
  group: any,
}

export default class GroupInfo extends React.Component<TGroupInfoProps, {}> {
  constructor(props) {
    super(props);
    this.state = {
      editedStudent: '',
    }
  }

  render() {
    const {group} = this.props;
    if (!group) {
      return <SGroupInfoWrapper/>;
    }

    const students = group.students;

    return (
        <SGroupInfoWrapper>
          {students ? <div>
            <SColumn>
              <SColumnHeader>Информация о группе:</SColumnHeader>
              <SRow>Профиль: {group.profile}</SRow>
              <SRow>Направление: {group.direction}</SRow>
              <SRow>Отделение: {printStudyType(group.studyType)} <span
                  onClick={() => this.props.changeField('type',
                      'Очное')}>Изменить</span></SRow>
            </SColumn>
            <SStudentsTableWrapper>
              <STable>
                {this.renderHeader()}
                <STableBody>
                  {students.map(
                      (student, index) =>
                          <SStudentsTableRow key={index}>
                            <STableCell key={0}>
                              {`${index + 1}. ${getStudentName(student)}`}
                            </STableCell>
                            {this.renderActions(student)}
                          </SStudentsTableRow>)}
                </STableBody>
              </STable>
            </SStudentsTableWrapper>
            <SFooterActions>
              <Button color='success'
                      onClick={() => this.props.addStudent(
                  'Никитин Андрей Акакевич')}
                      text='Добавить студента'/>
              <Button color='danger'
                      onClick={() => this.props.removeGroup()}
                      text='Удалить группу'/>
            </SFooterActions>
          </div> : null}
        </SGroupInfoWrapper>
    );
  }

  renderHeader() {
    const titles = ['ФИО студента', 'Действия'];

    return (
        <STableHeader>
          <STableRow>
            {titles.map(
                (title, index) => <STableCell key={index}>{title}</STableCell>)}
          </STableRow>
        </STableHeader>
    );
  }

  renderActions(student) {
    return (
        <STableCell key={999}>
          <SActionsWrapper>
            <SEditButton
                onClick={() => this.editStudent()}>
              Изменить
            </SEditButton>
            <SRemoveButton
                onClick={() => this.props.removeStudent(student)}>
              Удалить
            </SRemoveButton>
          </SActionsWrapper>
        </STableCell>
    );
  }

  editInfo(infoType: string, newInfo: string) {

  }

  editStudent() {

    this.props.editStudent();
  }
}
