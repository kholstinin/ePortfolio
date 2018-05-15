import workTypes from '../../../data/workTypes';
import WorkFile from './workFile';

import store from '../../redux/store';
import {addWrongWork} from '../../redux/actions/actions';

import type {TStudentFullName} from '../../typings/StudentFullName';

export default class Work {
  type = '';
  name = '';
  path = '';
  studentFullName = '';
  disciplineName = '';
  disciplineFullName = '';
  numberOfWorks = 0;
  workFiles = [];
  needWorks = {};

  numberOfVerifiedWorks = 0;

  constructor(
      tree: dirTree,
      groupName: string,
      studentFullName: TStudentFullName,
      disciplineName: string,
      disciplineFullName: string,
      needWorks,
      disciplinePortfolioStatus) {
    this.type = tree.name;
    this.name = tree.name;
    this.path = tree.path;

    this.studentFullName = studentFullName;
    this.groupName = groupName;

    this.numberOfWorks = tree.children.length;
    this.needWorks = needWorks.find(work => work.type === this.type);

    if (this._validateWorkType() && this.needWorks) {
      if (this.validateNumberOfWork()) {

        let workTypePortfolioStatus = null;
        if (disciplinePortfolioStatus) {
          workTypePortfolioStatus = disciplinePortfolioStatus.works.find(
              item => item.workType === this.type);
        }

        this.workFiles = tree.children.map(
            file => new WorkFile(file, groupName, studentFullName,
                disciplineName,
                disciplineFullName,
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

  countWorks() {
    this.workFiles.forEach(work => {
      if (work.verified) {
        this.numberOfVerifiedWorks++;
      }
    })
  }

  _validateWorkType(): boolean {
    return workTypes.findIndex(type => type === this.type) !== -1;
  }

  validateNumberOfWork(): boolean {
    return this.numberOfWorks === this.needWorks.workNumbers.length;
  }
}