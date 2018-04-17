import React from 'react';
import styled from 'styled-components';
import {portfDB} from '../../common/databases';

import {PageWrapper, PageHeader, PageContent} from '../../components/page/Page';
import {compareStudents, getDocs} from '../../common/utils';

import type {TStudentPortfolio} from '../../typings/Portfolio';
import type {TStudentFullName} from '../../typings/StudentFullName';
import portfolio from '../../reducers/portfolioReducer';
import {getNameWithInitials} from '../../common/nameSplit';

const SActionHeader = styled.div`
  width: 100%;
  height: 80px;
`;

const SColumn = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
`;

const SColumnHeader = styled.div`
  margin-bottom: 15px;
`;

const SGroupColumn = SColumn.extend`
  width: 200px;
`;

const SStudentsColumn = SColumn.extend`
  width: 300px;
`;

const SDisciplinesColumn = SColumn.extend`
  width: 300px;
`;

const SWorksColumn = SColumn.extend`
  width: 100%;
  border-right: none;
`;

const SColumnItem = styled.div`
  margin-bottom: 5px;
  cursor: pointer;
`;

const SRow = styled.div`
  display: flex;
  width: 100%;
  height: 650px;
  flex-direction: row;
`;

type TStatusPageProps = {}

type TStatusPageState = {
  portfolio: Array<TStudentPortfolio>,
  groups: Array<string>,
  activeGroup: string,
  activeStudent: TStudentPortfolio,
  activeDiscipline: string,
}

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
    const {portfolio, groups, activeGroupName, activeDiscipline} = this.state;
    console.log(portfolio);

    const activeGroup = groups.find(
        group => group.groupName === activeGroupName);

    return <PageWrapper>
      <PageHeader text='Статус портфолио'/>
      <PageContent>
        <SActionHeader/>
        <SRow>
          <SGroupColumn>
            <SColumnHeader>Группы</SColumnHeader>
            {groups &&
            groups.map(
                (item, index) => <SColumnItem
                    onClick={() => this.setState(
                        {activeGroupName: item.groupName})}
                    key={index}>{item.groupName}</SColumnItem>)}
          </SGroupColumn>
          <SStudentsColumn>
            <SColumnHeader>Студенты</SColumnHeader>
            {activeGroup && activeGroup.students.map(
                (student, index) => <SColumnItem
                    onClick={() => this.setState({activeStudent: student})}
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
      </PageContent>
    </PageWrapper>;
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

    console.log(arrOfWorks);

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