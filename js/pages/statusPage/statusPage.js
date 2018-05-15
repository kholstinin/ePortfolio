import type {TStatusPageProps,TStatusPageState} from './typings';
import type {TStudentPortfolio} from '../../typings/Portfolio';

import React from 'react';
import {portfDB} from '../../common/databases';

import Button from '../../components/button/Button';
import {
  Container,
  PageWrapper,
  PageHeader,
  SPageControls,
} from '../../components/page/Page';
import {
  SColumnHeader,
  SGroupColumn,
  SStudentsColumn,
  SDisciplinesColumn,
  SWorksColumn,
  SColumnItem,
  SRow,
} from './styles';

import {getDocs} from '../../common/utils';
import {getNameWithInitials} from '../../common/nameSplit';

export default class StatusPage extends React.Component<TStatusPageProps, TStatusPageState> {
  constructor(props) {
    super(props);

    this.state = {
      portfolio: [],
      groups: [],
      activeGroupName: '',
      activeStudent: {},
      activeDiscipline: {},
    };
  }

  componentDidMount() {
    portfDB.allDocs({include_docs: true}).then(result => {
      const portfolio = getDocs(result.rows);

      this.setState({
        portfolio: portfolio,
        groups: this.getGroups(portfolio),
      });
    });
  }

  render() {
    const {groups, activeGroupName} = this.state;

    const activeGroup = groups.find(
        group => group.groupName === activeGroupName);

    return <Container>
      <PageHeader text='Статус портфолио'/>
      <PageWrapper>
        <SPageControls>
          <Button text='Очистить фильтры'
                  onClick={this.clearFilters}
          />
        </SPageControls>
        <SRow>
          <SGroupColumn>
            <SColumnHeader>Группы</SColumnHeader>
            {groups &&
            groups.map(
                (item, index) => <SColumnItem
                    onClick={() => this.setState(
                        {
                          activeGroupName: item.groupName,
                          activeStudent: {},
                          activeDiscipline: {},
                        })}
                    key={index}>{item.groupName}</SColumnItem>)}
          </SGroupColumn>
          <SStudentsColumn>
            <SColumnHeader>Студенты</SColumnHeader>
            {activeGroup && activeGroup.students.map(
                (student, index) => <SColumnItem
                    onClick={() => this.setState({
                      activeStudent: student,
                      activeDiscipline: {},
                    })}
                    key={index}>{getNameWithInitials(
                    student.name)}</SColumnItem>)}
          </SStudentsColumn>
          <SDisciplinesColumn>
            <SColumnHeader>Дисциплины</SColumnHeader>
            {this.renderDisciplines()}
          </SDisciplinesColumn>
          <SWorksColumn>
            <SColumnHeader>Сданные работы</SColumnHeader>
            {this.renderWorks()}
          </SWorksColumn>
        </SRow>
      </PageWrapper>
    </Container>;
  }

  renderWorks() {
    const {activeDiscipline} = this.state;
    if (!activeDiscipline.works) {
      return null;
    }

    const works = this.state.activeDiscipline.works;

    return (
        works.map((work, index) => {
          const worksByType = this.getArrOfWorkByType(work);
          return (
              <div key={index}>
                {worksByType.workType}<br/>
                {worksByType.arrOfWorks.map((workNumber, index) => <span
                    key={index}>{workNumber}{' '}</span>)}
              </div>
          );
        })
    );
  }

  getArrOfWorkByType(work: { [string]: boolean, workType: string }): { works: Array<string>, workType: string } {
    const arrOfWorks = [];
    const workType = work.workType;

    for (let workNumber in work) {
      if (work[workNumber].status) {
        arrOfWorks.push(workNumber);
      }
    }

    return {
      workType,
      arrOfWorks,
    };
  }

  renderDisciplines() {
    const {activeStudent} = this.state;

    if (activeStudent && activeStudent.name) {

      return activeStudent.portfolio.map((discipline, index) => (
              <SColumnItem
                  key={index}
                  onClick={() => this.setState({activeDiscipline: discipline})}
              >
                {discipline.disciplineName}
              </SColumnItem>
          ),
      );
    }

    return null;
  }

  getGroups(portfolio: Array<TStudentPortfolio>): Array<string> {
    const groups = {};

    portfolio.forEach(studentPortfolio => {
      if (!groups[studentPortfolio.group]) {
        groups[studentPortfolio.group] = [];
      }

      groups[studentPortfolio.group].push(studentPortfolio);
    });

    const arrOfGroups = [];
    for (let groupName in groups) {
      if (groups.hasOwnProperty(groupName)) {
        arrOfGroups.push({groupName, students: groups[groupName]});
      }
    }

    return arrOfGroups.sort();
  };
}