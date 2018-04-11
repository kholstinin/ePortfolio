import disciplines from '../../../data/disciplines';
import Work from './work';

export default class Discipline {
  name = '';
  works = [];
  disciplineInfo = {};
  isDone = false;

  constructor(
      tree: dirTree, groupName: string, studentName: string, portfolioStatus) {
    this.name = tree.name;
    const worksArrTree = tree.children;

    if (this._validateDisciplineName(disciplines.arr)) {
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

  _validateDisciplineName(disciplines): boolean {
    const disciplineInfo = disciplines.find(
        discipline => discipline.disciplineName === this.name);
    this.disciplineInfo = disciplineInfo;

    return !!disciplineInfo;
  }
}