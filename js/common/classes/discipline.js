import Work from './work';
import {discDB} from '../../common/databases';
import {getDisciplineId} from '../getId';
import worksHandler from '../worksHandler';

import {TStudentPortfolio} from '../../typings/Portfolio';
import {TStudyType} from '../../typings/Common';

export default class Discipline {
  _tree = {};
  _portfolioStatus = {};

  name = '';
  fullName = '';
  works = [];
  isDone = false;

  constructor(
      tree: dirTree, groupName: string, studentFullName: string,
      portfolioStatus: TStudentPortfolio, studyType: TStudyType) {
    this._tree = tree.children;
    this._portfolioStatus = portfolioStatus;

    this.name = tree.name;
    this.studentFullName = studentFullName;
    this.groupName = groupName;
    this.studyType = studyType;
  }

  initialiseDiscipline() {
    const id = getDisciplineId(this.name, this.studyType);
    discDB.get(id).then(discipline => {
      const needWorks = discipline.works;
      this.fullName = discipline.fullName;

      const disciplinePortfolioStatus = this._portfolioStatus.portfolio.find(
          item => item.disciplineName === this.name);

      if (disciplinePortfolioStatus) {
        this.isDone = disciplinePortfolioStatus.isDone;
      }

      this.works = this._tree.map(
          work => new Work(work, this.groupName, this.studentFullName,
              this.name,
              needWorks,
              disciplinePortfolioStatus));
    }).catch(err => {
      if (err.name === 'not_found') {
        this.err = 'Такой дисциплины не существует';
        worksHandler.addWrongWork(this);
      }
    });
  }
}