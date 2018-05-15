import type {TStudentFullName} from '../../typings/StudentFullName';

import {
  getFileNameFromInfo,
  getWorkTypeAbbr,
  getInfoFromFileName,
} from '../nameSplit';

const fs = require('fs');

import store from '../../redux/store';
import {addUnverifiedWork, addWrongWork} from '../../redux/actions/actions';

export default class WorkFile {
  workNumber = '';
  workType = '';
  disciplineName = '';
  disciplineFullName = '';

  name = '';

  studentFullName: '';
  groupName = '';
  path = '';
  expectedFileName = '';
  extension = '';
  verified = false;
  wrong = false;

  constructor(
      file: dirTree, groupName: string, studentFullName: TStudentFullName,
      disciplineName: string, disciplineFullName: string, workType: string,
      workTypePortfolioStatus) {
    this.name = file.name;
    this.disciplineName = disciplineName;
    this.disciplineFullName = disciplineFullName;
    this.groupName = groupName;
    this.extension = file.extension;
    this.path = file.path;
    this.studentFullName = studentFullName;

    const fileInfo = getInfoFromFileName(file.name);
    const number = fileInfo.workNumber;
    this.workNumber = number;
    this.workType = fileInfo.workType;

    const workTypeAbbr = getWorkTypeAbbr(workType);
    this.expectedFileName = getFileNameFromInfo(groupName, studentFullName,
        disciplineName, workTypeAbbr, number);

    if (this._validateWorkFile()) {
      let workStatus = {};

      if (workTypePortfolioStatus && workTypePortfolioStatus[number]) {
        workStatus = workTypePortfolioStatus[number];
      }

      if (workStatus.status === false) {
        const currentModificationLastTime = fs.statSync(this.path).mtime.toString();
        if (currentModificationLastTime === workStatus.lastModified) {
          this.wrong = true;
        } else {
          store.dispatch(addUnverifiedWork(this));
        }
      } else if (workStatus.status === undefined) {
        store.dispatch(addUnverifiedWork(this));
      } else {
        this.verified = true;
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