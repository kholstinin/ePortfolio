import DisciplineWorks from './disciplineWorks';
import PortfolioWorks from './portfolioWorks';

export default class ComparePortfolioWithDiscipline {
  disciplineWorksNumber = 0;
  portfolioWorksNumber = 0;

  constructor(portfolioWorksArr, disciplineWorksArr) {
    const disciplineWorks = new DisciplineWorks(disciplineWorksArr);
    this.disciplineWorksNumber = disciplineWorks.getAllWorksNumber();

    const portfolioWorks = new PortfolioWorks(portfolioWorksArr);
    this.portfolioWorksNumber = portfolioWorks.getAllWorksNumber();
  }

  getNumberOfDisciplineWorks() {
    return this.disciplineWorksNumber;
  }

  getNumberOfPortfolioWorks() {
    return this.portfolioWorksNumber;
  }
}