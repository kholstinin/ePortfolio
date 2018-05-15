import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import Button from '../../../components/button/Button';
import {
  STable,
  STableHeader,
  STableBody,
  STableCell,
  STableRow,
} from '../../../components/table/TableStyles';

import {getStudentName, printStudyType} from '../../../common/utils';

import {
  SGroupInfoWrapper,
  SEditButton,
  SRemoveButton,
  SStudentsTableWrapper,
  SActionsWrapper,
  SStudentsTableRow,
  SFooterActions,
  SColumnHeader,
  SColumn,
  SRow,
  SIconWrapper,
} from './styles';

import type {TGroupInfo} from '../../../typings/Group';
import type {TStudentFullName} from '../../../typings/StudentFullName';
import {mainColor} from '../../../common/palette';

type TGroupInfoProps = {
  group: TGroupInfo,
  editGroup: () => {},
}

export default class GroupInfo extends React.Component<TGroupInfoProps, {}> {
  constructor(props) {
    super(props);
    this.state = {
      editedStudent: '',
    };
  }

  renderField(fieldName: string, fieldLabel: string, fieldValue: string) {
    return (
        <SRow>
          {fieldLabel}: {fieldValue}
          <SIconWrapper onClick={() => this.props.showEditModal(fieldName)}>
            <FontAwesomeIcon
                icon='pencil-alt'
                transform={{size: 14}}
                color={mainColor}
            />
          </SIconWrapper>
        </SRow>
    );
  }

  render() {
    const {group} = this.props;
    if (!group) {
      return <SGroupInfoWrapper/>;
    }

    const students = group.students.sort(
        (student1, student2) => student1.surname > student2.surname);

    return (
        <SGroupInfoWrapper>
          {students ? <div>
            <SColumn>
              <SColumnHeader>Информация о группе:</SColumnHeader>
              {this.renderField('profile', 'Профиль', group.profile)}
              {this.renderField('direction', 'Направление', group.direction)}
              {this.renderField('studyType', 'Отделение',
                  printStudyType(group.studyType))}
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
                      onClick={this.props.addStudent}
                      text='Добавить студента'/>
              <Button color='danger'
                      onClick={this.props.removeGroup}
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

  renderActions(student: TStudentFullName) {
    return (
        <STableCell key={999}>
          <SActionsWrapper>
            <SEditButton
                onClick={() => this.props.editStudent(student)}>
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
}
