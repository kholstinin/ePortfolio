import workTypes from '../../../data/workTypes';
import WorkFile from './workFile';

import store from '../../reducers/store';
import {addWrongWork} from '../../reducers/actions';

import type {TStudentFullName} from '../../typings/StudentFullName';

export default class Work {
  type = '';
  name = '';
  path = '';
  numberOfWorks = 0;
  workFiles = [];
  needWorks = {};

  constructor(
      tree: dirTree, groupName: string, studentFullName: TStudentFullName,
      disciplineName: string, needWorks, disciplinePortfolioStatus) {
    this.type = tree.name;
    this.name = tree.name;
    this.path = tree.path;
    this.numberOfWorks = tree.children.length;
    this.needWorks = needWorks.find(work => work.type === this.type);

    if (this._validateWorkType()) {
      if (this.validateNumberOfWork()) {

        let workTypePortfolioStatus = null;
        if (disciplinePortfolioStatus) {
          workTypePortfolioStatus = disciplinePortfolioStatus.works.find(
              item => item.workType === this.type);
        }

        this.workFiles = tree.children.map(
            file => new WorkFile(file, groupName, studentFullName,
                disciplineName,
                this.type, workTypePortfolioStatus));

      } else {
        this.err = 'Количество работ не соответствует требуемому';
        store.dispatch(addWrongWork(this));
      }
    } else {
      this.err = 'Неверное название папки с работами';
      store.dispatch(addWrongWork(this));
    }
  }

  _validateWorkType(): boolean {
    return workTypes.findIndex(type => type === this.type) !== -1;
  }

  validateNumberOfWork(): boolean {
    return this.numberOfWorks === this.needWorks.workNumbers.length;
  }

}