import {
  getFileNameFromInfo,
  getWorkTypeAbbr,
  getInfoFromFileName,
} from '../nameSplit';

import store from '../../reducers/store';
import {addUnverifiedWork, addWrongWork} from '../../reducers/actions';
import type {TStudentFullName} from '../../typings/StudentFullName';

export default class WorkFile {
  name: '';
  studentFullName: '';
  groupName = '';
  path = '';
  expectedFileName = '';
  extension = '';
  verified = false;
  err: string;

  constructor(
      file: dirTree, groupName: string, studentFullName: TStudentFullName,
      disciplineName: string, workType: string,
      workTypePortfolioStatus) {
    this.name = file.name;
    this.groupName = groupName;
    this.extension = file.extension;
    this.path = file.path;
    this.studentFullName = studentFullName;

    const number = getInfoFromFileName(file.name).workNumber;
    const workTypeAbbr = getWorkTypeAbbr(workType);
    this.expectedFileName = getFileNameFromInfo(groupName, studentFullName,
        disciplineName, workTypeAbbr, number);

    if (this._validateWorkFile()) {
      //console.log(workTypePortfolioStatus);

      if (workTypePortfolioStatus && workTypePortfolioStatus[number]) {
        this.verified = workTypePortfolioStatus[number].status;
      }

      if (!this.verified) {
        store.dispatch(addUnverifiedWork(this));
      }

    } else {
      this.err = 'Работа названа неправильно';
      store.dispatch(addWrongWork(this));
    }
  }

  _validateWorkFile(): boolean {
    return this.name === this.expectedFileName;
  }
}