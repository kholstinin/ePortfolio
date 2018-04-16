import React from 'react';
import {connect} from 'react-redux';

import {PageWrapper, PageHeader, PageContent} from '../../components/page/Page';

import openWorks from '../../common/openPdfModal';
import {getInfoFromFileName} from '../../common/nameSplit';

import {
  STableWrapper,
  SWorkTable,
  SWorkTableBody,
  SWorkTableRow,
  SWorkTableHeader,
  SWorkTableCell,
  SControls
} from './styles';

class ReviewPage extends React.Component {
  render() {
    const {works} = this.props;

    return (
        <PageWrapper>
          <PageHeader text='Работы на проверку'/>
          <PageContent>
            <SControls>
              <a onClick={() => openWorks(this.getInfoFromWorks(), this.getPathsFromWorks())}>
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

const mapStateToProps = state => ({
  works: state.works.unverifiedWorks,
});

export default connect(mapStateToProps)(ReviewPage);