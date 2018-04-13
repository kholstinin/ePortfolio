import React from 'react';
import styled from 'styled-components';
import worksHandler from '../../common/worksHandler';

import {PageWrapper, PageHeader, PageContent} from '../../components/page/Page';

import openWorks from '../../common/openPdfModal';
import {getInfoFromFileName} from '../../common/nameSplit';

const STableWrapper = styled.div`
  height: 600px;
  overflow-y: auto;
`;

const SWorkTable = styled.div`
  display: table;
  width: 100%;
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

const SWorkTableHeader = styled.div`
  display: table-header-group;
  cursor: default;
  
  &:hover ${SWorkTableRow}{
    background-color: transparent ;
  }
`;

const SWorkTableCell = styled.div`
  display: table-cell;
  padding: 5px;
  border-bottom: 1px solid #000;
`;

const SControls = styled.div`
  width: 100%;
  height: 80px;
`;

export default class ReviewPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      works: worksHandler.getUnverifiedWorks(),
    };
  }

  render() {
    const {works} = this.state;
    const workInfo = this.getInfoFromWorks();
    const workPaths = this.getPathsFromWorks();

    return (
        <PageWrapper>
          <PageHeader text='Работы на проверку'/>
          <PageContent>
            <SControls>
              <a onClick={() => openWorks(workPaths, workInfo)}>
                Начать проверять все работы
              </a>
            </SControls>
            <STableWrapper>
              <SWorkTable>
                {this.renderTableHeader()}
                <SWorkTableBody>
                  {works.map((work, index) => this.renderWork(work, index))}
                </SWorkTableBody>
              </SWorkTable>
            </STableWrapper>
          </PageContent>
        </PageWrapper>);
  }

  getPathsFromWorks() {
    const {works} = this.state;

    return works.map(work => work.path);
  }

  getInfoFromWorks() {
    const {works} = this.state;

    return works.map(work => {
      return {
        fullName: work.studentFullName,
        groupName: work.groupName,
      };
    });
  }

  renderTableHeader() {
    const titles = [
      'Группа',
      'Студент',
      'Дисциплина',
      'Тип работы',
      'Номер',
      'Статус'];

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
        <SWorkTableRow key={rowKey} onClick={() => openWorks([work.path])}>
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