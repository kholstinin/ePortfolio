import type {TStatusPageProps, TStatusPageState} from './typings';
import type {TStudentPortfolio} from '../../typings/Portfolio';

import React from 'react';
import {portfDB, discDB} from '../../common/databases';

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
  SWorkNumber,
} from './styles';

import {getDocs} from '../../common/utils';
import {getNameWithInitials} from '../../common/nameSplit';
import DisciplineWorks from '../../common/disciplineWorks';
import type {TDisciplineInfo} from '../../typings/Discipline';
import ComparePortfolioWithDiscipline
  from '../../common/comparePortfolioWithDiscipline';

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
    portfDB.allDocs({include_docs: true}).then(portfDocs => {
      const portfolio = getDocs(portfDocs.rows);
      discDB.allDocs({include_docs: true}).then(discDocs => {
        const disciplines = getDocs(discDocs.rows);

        this.setState({
          portfolio: portfolio,
          groups: this.getGroups(portfolio),
          disciplines: disciplines,
        });
      });
    });
  }

  render() {

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
            {this.renderGroups()}
          </SGroupColumn>
          <SStudentsColumn>
            <SColumnHeader>Студенты</SColumnHeader>
            {this.renderStudents()}
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

  renderGroups() {
    const {groups} = this.state;

    if (!groups) {
      return null;
    }

    return groups.map(
        (item, index) => <SColumnItem
            onClick={() => this.setState(
                {
                  activeGroupName: item.groupName,
                  activeStudent: {},
                  activeDiscipline: {},
                })}
            key={index}>{item.groupName}</SColumnItem>);
  }

  renderStudents() {
    const activeGroup = this.state.groups.find(
        group => group.groupName === this.state.activeGroupName);

    if (!activeGroup) {
      return null;
    }

    const students = activeGroup.students.sort(
        (student1, student2) => student1.name.surname > student2.name.surname);
    return students.map(
        (student, index) =>
            <SColumnItem
                onClick={() => this.setState({
                  activeStudent: student,
                  activeDiscipline: {},
                })}
                key={index}>
              {getNameWithInitials(student.name)}
            </SColumnItem>);
  }

  renderWorks() {
    const {activeDiscipline} = this.state;
    if (!activeDiscipline.works) {
      return null;
    }

    const currentWorks = this.state.activeDiscipline.works;
    const worksByTypeArr = currentWorks.map(
        work => this.getArrOfWorkByType(work));

    const currentDiscipline = this.getDiscipline(
        activeDiscipline.disciplineFullName);

    return (
        currentDiscipline.works.map((work, index) => {
          const completedWorks = worksByTypeArr.find(
              item => {
                return item.workType === work.type;
              });

          return (
              <div key={index}>
                {work.type}<br/>
                {work.workNumbers.map((workNumber, index) =>
                    <SWorkNumber
                        verified={completedWorks && this.isWorkCompleted(
                            completedWorks.arrOfWorks, workNumber)}
                        key={index}>
                      {workNumber}{' '}
                    </SWorkNumber>)}
              </div>
          );
        })
    );
  }

  isWorkCompleted(arrOfWorks: Array<string>, workNumber: string) {
    if (!arrOfWorks) {
      return false;
    }

    return arrOfWorks.findIndex(
        work => work.toString() === workNumber.toString()) !== -1;
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

  getDiscipline(disciplineFullName: string): TDisciplineInfo {
    return this.state.disciplines.find(
        item => item.fullName.toLowerCase() ===
            disciplineFullName.toLowerCase());
  }

  renderDisciplines() {
    const {activeStudent} = this.state;

    if (activeStudent && activeStudent.name) {
      return activeStudent.portfolio.map((discipline, index) => {
            const currentDiscipline = this.getDiscipline(
                discipline.disciplineFullName);
            const numbersOfWorks = new ComparePortfolioWithDiscipline(discipline,
                currentDiscipline.works);

            return (
                <SColumnItem
                    key={index}
                    onClick={() => this.setState({activeDiscipline: discipline})}
                >
                  {`${discipline.disciplineName} ${numbersOfWorks.getNumberOfPortfolioWorks()}/${numbersOfWorks.getNumberOfDisciplineWorks()}`}
                </SColumnItem>
            );
          },
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