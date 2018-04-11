import workTypes from '../../../data/workTypes';
import WorkFile from './workFile';

export default class Work {
  type = '';
  numberOfWorks = 0;
  workFiles = [];
  needWorks = {};

  constructor(
      tree: dirTree, groupName: string, studentName: string,
      disciplineName: string, needWorks, disciplinePortfolioStatus) {
    this.type = tree.name;
    this.numberOfWorks = tree.children.length;
    this.needWorksNumber = needWorks[this.type];

    if (this.validateWorkType()) {
      let workTypePortfolioStatus = null;
      if (disciplinePortfolioStatus) {
        workTypePortfolioStatus = disciplinePortfolioStatus.works.find(
            item => item.workType === this.type);
      }

      this.workFiles = tree.children.map(
          file => new WorkFile(file, groupName, studentName, disciplineName,
              this.type, workTypePortfolioStatus));

      // if (!this.validateNumberOfWork()) {
      //   this.err = 'Количество работ не соответствует требуемому';
      // }
    } else {
      this.err = 'Неверое название папки';
    }
  }

  initialiseWorkFiles() {

  }

  validateWorkType(): boolean {
    return workTypes.findIndex(type => type === this.type) !== -1;
  }

  validateNumberOfWork(): boolean {
    return this.numberOfWorks === this.needWorksNumber;
  }

}