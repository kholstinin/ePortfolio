export default class PortfolioWorks {
  works = [];

  constructor(portfolioWorks) {
    this.works = portfolioWorks.works;
  }

  getAllWorksNumber() {
    let numberOfWorks = 0;
    this.works.forEach(item => numberOfWorks += Object.keys(item).length - 1);
    return numberOfWorks;
  }
}