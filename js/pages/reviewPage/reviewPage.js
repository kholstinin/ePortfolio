import React from 'react';
import styled from 'styled-components';
import worksHandler from '../../common/worksHandler';

import PageHeader from '../../components/pageHeader/PageHeader';
import PageWrapper from '../../components/pageWrapper/PageWrapper';

import {getInfoFromFileName} from '../../common/nameSplit';

const SWorkTable = styled.div`
  display: table;
  width: 100%;
`;

const SWorkTableHeader = styled.div`
  display: table-header-group;
`;

const SWorkTableBody = styled.div`
  display: table-row-group;
`;

const SWorkTableRow = styled.div`
  display: table-row;
  cursor: pointer;
  
  &:hover {
    background-color: #dcdcdc;
  }
`;

const SWorkTableCell = styled.div`
  display: table-cell;
  padding: 5px;
  border-bottom: 1px solid #000;
`;

export default class ReviewPage extends React.Component {
  constructor() {
    super();
    this.state = {
      works: worksHandler.getUnverifiedWorks(),
    };
  }

  render() {
    const {works} = this.state;
    console.log(works);
    return (
        <PageWrapper>
          <PageHeader text='Работы на проверку'/>
          <SWorkTable>
            {this.renderTableHeader()}
            <SWorkTableBody>
              {works.map((work, index) => this.renderWork(work, index))}
            </SWorkTableBody>
          </SWorkTable>
        </PageWrapper>);
  }

  renderTableHeader() {
    const titles = ['Группа', 'Студент', 'Дисциплина', 'Тип работы', 'Номер', 'Статус'];
    return (
        <SWorkTableHeader>
          <SWorkTableRow>
            {titles.map((title, index) => <SWorkTableCell
                key={index}>{title}</SWorkTableCell>)}
          </SWorkTableRow>
        </SWorkTableHeader>
    );
  }

  renderWork(work: any, rowKey: number) {
    const workInfo = getInfoFromFileName(work.name);
    const workType = workInfo.workType.split(' ')[0];
    let key = 0;

    return (
        <SWorkTableRow key={rowKey}>
          <SWorkTableCell key={++key}>{workInfo.group}</SWorkTableCell>
          <SWorkTableCell key={++key}>{workInfo.name}</SWorkTableCell>
          <SWorkTableCell key={++key}>{workInfo.discipline}</SWorkTableCell>
          <SWorkTableCell key={++key}>{workType}</SWorkTableCell>
          <SWorkTableCell key={++key}>{workInfo.workNumber}</SWorkTableCell>
          <SWorkTableCell key={++key}>{work.verified}</SWorkTableCell>
        </SWorkTableRow>
    );
  }
}