import disciplines from '../../../data/disciplines';
import Work from './work';

export default class Discipline {
  name = '';
  works = [];
  allDisciplines = [];
  disciplineInfo = {};
  isDone = false;

  constructor(
      tree: dirTree, groupName: string, studentName: string, portfolioStatus,
      disciplinesArr) {
    this.name = tree.name;
    const worksArrTree = tree.children;

    if (disciplinesArr) {
      this.allDisciplines = disciplinesArr;
    } else {
      this.allDisciplines = disciplines.fullTime;
    }

    if (this._validateDisciplineName()) {
      const needWorks = this.disciplineInfo.works;
      const portfolioStatusExist = portfolioStatus.portfolio &&
          portfolioStatus.portfolio.length;
      let disciplinePortfolioStatus = null;

      if (portfolioStatusExist) {
        disciplinePortfolioStatus = portfolioStatus.portfolio.find(
            item => item.disciplineName === this.name);
        if (disciplinePortfolioStatus) {
          this.isDone = disciplinePortfolioStatus.isDone;
        }
      }

      this.works = worksArrTree.map(
          work => new Work(work, groupName, studentName, this.name, needWorks,
              disciplinePortfolioStatus));
    } else {
      this.err = 'Такой дисциплины не существует';
    }
  }

  _validateDisciplineName(): boolean {
    const disciplineInfo = this.allDisciplines.find(
        discipline => discipline.disciplineName === this.name);
    this.disciplineInfo = disciplineInfo;

    return !!disciplineInfo;
  }
}