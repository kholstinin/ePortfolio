import Work from './work';
import {discDB, portfDB} from '../../common/databases';
import {getDisciplineId} from '../getId';

import store from '../../redux/store';
import {addReference, addWrongWork} from '../../redux/actions/actions';

import {TStudentPortfolio} from '../../typings/Portfolio';
import {TStudyType} from '../../typings/Common';
import StudentPortfolioUtil from '../StudentPortfolioUtil';
import {validateDiscipline} from '../portfolioUtils';

export default class Discipline {
  _tree: Array<dirTree>;
  _portfolioStatus: TStudentPortfolio;

  name = '';
  path = '';
  fullName = '';
  studentFullName = '';
  groupName = '';
  studyType = '';
  works = [];
  isDone = false;

  numberOfWorks = 0;
  numberOfVerifiedWorks = 0;

  constructor(
      tree: dirTree, groupName: string, studentFullName: string,
      portfolioStatus: TStudentPortfolio, studyType: TStudyType) {
    this._tree = tree.children;
    this.path = tree.path;
    this._portfolioStatus = portfolioStatus;

    this.fullName = tree.name;
    this.studentFullName = studentFullName;
    this.groupName = groupName;
    this.studyType = studyType;
  }

  initialiseDiscipline() {
    const id = getDisciplineId(this.fullName, this.studyType);
    return discDB.get(id).then(discipline => {
      const needWorks = discipline.works;
      this.name = discipline.shortName;

      const disciplinePortfolioStatus = this._portfolioStatus.portfolio.find(
          item => item.disciplineName === this.name);

      if (disciplinePortfolioStatus) {
        this.isDone = disciplinePortfolioStatus.isDone || false;
        if (!this.isDone) {
          const isDone = validateDiscipline(needWorks,
              disciplinePortfolioStatus);

          if (isDone) {
            const studentPortfolio = new StudentPortfolioUtil(
                this._portfolioStatus);
            studentPortfolio.setDisciplineDone(this.name);

            portfDB.put(studentPortfolio.getPortfolio());
            store.dispatch(addReference(this));
          }
        } else {
          store.dispatch(addReference(this));
        }
      }

      this.works = this._tree.map(
          work => new Work(work, this.groupName, this.studentFullName,
              this.name,
              this.fullName,
              needWorks,
              disciplinePortfolioStatus));

    }).catch(err => {
      if (err.name === 'not_found') {
        this.err = 'Такой дисциплины не существует';
        store.dispatch(addWrongWork(this));
      } else {
        console.log(err);
      }
    });
  }

  countWorks() {
    this.works.forEach(work => {
      work.countWorks();
      this.numberOfWorks += work.numberOfWorks;
      this.numberOfVerifiedWorks += work.numberOfVerifiedWorks;
    });
  }
}