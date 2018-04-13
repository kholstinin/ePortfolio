import workTypes from '../../../data/workTypes';
import WorkFile from './workFile';

import type {TStudentFullName} from '../../typings/StudentFullName';

export default class Work {
  type = '';
  numberOfWorks = 0;
  workFiles = [];
  needWorks = {};

  constructor(
      tree: dirTree, groupName: string, studentFullName: TStudentFullName,
      disciplineName: string, needWorks, disciplinePortfolioStatus) {
    this.type = tree.name;
    this.numberOfWorks = tree.children.length;
    this.needWorks = needWorks.find(work => work.type === this.type);

    if (this._validateWorkType()) {
      let workTypePortfolioStatus = null;
      if (disciplinePortfolioStatus) {
        workTypePortfolioStatus = disciplinePortfolioStatus.works.find(
            item => item.workType === this.type);
      }

      this.workFiles = tree.children.map(
          file => new WorkFile(file, groupName, studentFullName, disciplineName,
              this.type, workTypePortfolioStatus));

      // if (!this.validateNumberOfWork()) {
      //   this.err = 'Количество работ не соответствует требуемому';
      // }
    } else {
      this.err = 'Неверое название папки';
    }
  }

  _validateWorkType(): boolean {
    return workTypes.findIndex(type => type === this.type) !== -1;
  }

  validateNumberOfWork(): boolean {
    return this.numberOfWorks === this.needWorksNumber;
  }

}