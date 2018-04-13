import {
  getFileNameFromInfo,
  getWorkTypeAbbr,
  getInfoFromFileName,
} from '../nameSplit';
import worksHandler from '../../common/worksHandler';

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
      file: dirTree, groupName, studentFullName, disciplineName, workType,
      workTypePortfolioStatus) {
    this.name = file.name;
    this.groupName = groupName;
    this.extension = file.extension;
    this.path = file.path;
    this.studentFullName = studentFullName;
    const number = getInfoFromFileName(file.name).workNumber;

    
    if (workTypePortfolioStatus && workTypePortfolioStatus[number]) {
      this.verified = workTypePortfolioStatus[number].status;
    }

    if (!this.verified) {
      worksHandler.addUnverifiedWork(this);
    }

    const workTypeAbbr = getWorkTypeAbbr(workType);
    this.expectedFileName = getFileNameFromInfo(groupName, studentFullName,
        disciplineName, workTypeAbbr, number);

    if (!this._validateWorkFile()) {
      this.err = 'Работа названа неправильно';
    }
  }

  _validateWorkFile(): boolean {
    return this.name === this.expectedFileName;
  }
}