import type {TStudentPortfolio} from '../typings/Portfolio';

export default class StudentPortfolioUtil {
  constructor(studentPortfolio: TStudentPortfolio) {
    this.studentPortfolio = studentPortfolio;
  }

  addWork(
      disciplineName: string,
      workType: string,
      workNumber: string,
      workStatus: TWorkStatus,
  ): void {
    const {disciplinePortfolioIndex, disciplinePortfolio, arrDisciplinePortfolio} = this._getDisciplinePortfolio(
        disciplineName);

    console.log('break');

    if (disciplinePortfolioIndex !== -1) {
      const works = disciplinePortfolio.works;

      if (works.length) {
        const oldWorkStatusIndex = works.findIndex(
            work => work.workType === workType);

        if (oldWorkStatusIndex !== -1) {
          const typeWorksObj = works[oldWorkStatusIndex];
          typeWorksObj[workNumber] = workStatus;
        } else {
          works.push({workType, [workNumber]: workStatus});
        }

      }
    } else {
      arrDisciplinePortfolio.push({
        disciplineName,
        works: [
          {
            workType,
            [workNumber]: workStatus,
          },
        ],
        isDone: false,
        referencePrinted: false,
      });
    }
  }

  getPortfolio() {
    return this.studentPortfolio;
  }

  _getDisciplinePortfolio(disciplineName: string): Array<TDisciplinePortfolio> {
    const arrDisciplinePortfolio = this.studentPortfolio.portfolio;
    const disciplinePortfolioIndex = arrDisciplinePortfolio.findIndex(
        work => work.disciplineName === disciplineName);
    const disciplinePortfolio = arrDisciplinePortfolio[disciplinePortfolioIndex];

    return {
      arrDisciplinePortfolio,
      disciplinePortfolioIndex,
      disciplinePortfolio,
    };
  }
}