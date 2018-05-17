import React from 'react';
import {connect} from 'react-redux';

import {Tooltip} from 'react-tippy';
import Button from '../../components/button/Button';
import {
  Container,
  PageWrapper,
  PageHeader,
  SPageControls,
} from '../../components/page/Page';

import openWorks from '../../common/openPdfModal';
import WorkFile from '../../common/classes/workFile';
import {
  getInfoFromFileName,
  getNameWithInitials,
  getStringFullName,
} from '../../common/nameSplit';

import {
  STableWrapper,
  SWorkTable,
  SWorkTableBody,
  SWorkTableRow,
  SWorkTableHeader,
  SWorkTableCell,
  SWorkTableHeaderAction,
  STableHeaderInput,
    STableCell,
    STableRow
} from './styles';

import {getSingleWorkType} from '../../common/utils';

const filters = [
  'groupInput',
  'studentInput',
  'disciplineInput',
  'workTypeInput',
  'workNumberInput',
];

class ReviewPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      groupInput: '',
      studentInput: '',
      disciplineInput: '',
      workTypeInput: '',
      workNumberInput: '',
    };
  }

  render() {
    const works = this.filterWorks();

    return (
        <Container>
          <PageHeader text='Работы на проверку'/>
          <PageWrapper>
            <SPageControls>
              <Button
                  onClick={this.checkAllWorks}
                  text='Проверка всех работ'/>
              <Button
                  onClick={() => this.checkFilteredWorks(works)}
                  text='Проверка выбранных работ'/>
              <Button text='Очистить фильтры'
                      onClick={this.clearFilters}
              />
            </SPageControls>
            <STableWrapper>
              {this.props.works.length ? <SWorkTable>
                {this.renderTableHeader()}
                <SWorkTableBody>
                  {works && works.length ?
                      works.map((work, index) => this.renderWork(work, index)) :
                      <STableRow>
                        <STableCell/>
                        <STableCell/>
                        <STableCell style={{textAlign: 'center', paddingTop: '15px'}}>Работы не найдены</STableCell>
                      </STableRow>}
                </SWorkTableBody>
              </SWorkTable> : <span>Нет работ на проверку</span>}
            </STableWrapper>
          </PageWrapper>
        </Container>);
  }

  checkAllWorks = () => {
    const {works} = this.props;
    if (works.length) {
      openWorks(this.getPathsFromWorks(works), this.getInfoFromWorks(works));
    }
  };

  checkFilteredWorks(works) {
    if (works.length) {
      openWorks(this.getPathsFromWorks(works), this.getInfoFromWorks(works));
    }
    this.clearFilters();
  }

  clearFilters = (): void => {
    filters.forEach(filter => {
      this.setState({[filter]: ''});
    });
  };

  filterWorks() {
    const {works} = this.props;

    let filteredWorks = works.map(item => item);

    const fieldNames = {
      groupInput: 'groupName',
      workTypeInput: 'workType',
    };

    filters.forEach(filter => {
      const filterValue = this.state[filter].toLowerCase();

      if (filterValue !== '') {
        if (fieldNames[filter]) {
          const fieldName = fieldNames[filter];

          filteredWorks = filteredWorks.filter(
              work => work[fieldName].toLowerCase().includes(filterValue));

        } else if (filter === 'workNumberInput') {
          const fieldName = 'workNumber';

          filteredWorks = filteredWorks.filter(
              work => work[fieldName] === filterValue);
        } else if (filter === 'studentInput') {
          filteredWorks = filteredWorks.filter(
              work => {
                const fullName = getStringFullName(work.studentFullName);
                return fullName.toLowerCase().
                    includes(filterValue);
              });

        } else if (filter === 'disciplineInput') {
          filteredWorks = filteredWorks.filter(
              work => {
                const disciplineFullNameInclude = work.disciplineFullName.toLowerCase().
                    includes(filterValue);
                const disciplineShortNameInclude = work.disciplineName.toLowerCase().
                    includes(filterValue);

                return disciplineFullNameInclude || disciplineShortNameInclude;
              });
        }
      }
    });

    return filteredWorks;
  }

  getPathsFromWorks(works) {
    return works.map(work => ({
      path: work.path,
      disciplineFullName: work.disciplineFullName,
    }));
  }

  getInfoFromWorks(works) {
    return works.map(work => this.getInfoFromWork(work));
  }

  getInfoFromWork(work) {
    return {
      fullName: work.studentFullName,
      groupName: work.groupName,
    };
  }

  renderTableHeader() {
    const titles = [
      'Группа',
      'Студент',
      'Дисциплина',
      'Тип работы',
      'Номер',
    ];

    const stateValues = {
      'Группа': 'groupInput',
      'Студент': 'studentInput',
      'Дисциплина': 'disciplineInput',
      'Тип работы': 'workTypeInput',
      'Номер': 'workNumberInput',
    };

    return (
        <SWorkTableHeader>
          <SWorkTableRow>
            {titles.map((title, index) => {
                  const filterName = stateValues[title];
                  return (<SWorkTableCell key={index}>
                    <SWorkTableHeaderAction>
                      {title}
                      <STableHeaderInput
                          onChange={(e) => this.setState(
                              {[filterName]: e.target.value})}
                          value={this.state[filterName]}/>
                    </SWorkTableHeaderAction>
                  </SWorkTableCell>);
                },
            )}
          </SWorkTableRow>
        </SWorkTableHeader>
    );
  }

  renderWork(work: WorkFile, rowKey: number) {
    let key = 0;

    return (
        <SWorkTableRow key={rowKey} onClick={() => openWorks(
            [{path: work.path, disciplineFullName: work.disciplineFullName}],
            [this.getInfoFromWork(work)])}>
          <SWorkTableCell key={++key}>{work.groupName}</SWorkTableCell>
          <SWorkTableCell key={++key}>
            {getNameWithInitials(work.studentFullName)}
          </SWorkTableCell>
          <SWorkTableCell key={++key}>{work.disciplineName}</SWorkTableCell>
          <SWorkTableCell key={++key}>
            {getSingleWorkType(work.workType)}
          </SWorkTableCell>
          <SWorkTableCell key={++key}>{work.workNumber}</SWorkTableCell>
        </SWorkTableRow>
    );
  }
}

const mapStateToProps = state => ({
  works: state.works.unverifiedWorks,
});

export default connect(mapStateToProps)(ReviewPage);