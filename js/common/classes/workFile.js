import {
  getFileNameFromInfo,
  getWorkTypeAbbr,
  getInfoFromFileName,
} from '../nameSplit';
import worksHandler from '../../common/worksHandler';

export default class WorkFile {
  name: '';
  expectedFileName = '';
  path = '';
  extension = '';
  verified = false;

  err: string;

  constructor(
      file: dirTree, groupName, studentName, disciplineName, workType,
      workTypePortfolioStatus) {
    this.name = file.name;
    this.extension = file.extension;
    this.path = file.path;
    const number = getInfoFromFileName(file.name).workNumber;

    if (workTypePortfolioStatus) {
      this.verified = !!workTypePortfolioStatus[number];
    }

    if (!this.verified) {
      worksHandler.addUnverifiedWork(this);
    }

    const workTypeAbbr = getWorkTypeAbbr(workType);
    this.expectedFileName = getFileNameFromInfo(groupName, studentName,
        disciplineName, workTypeAbbr, number);

    if (!this.validateWorkFile()) {
      this.err = 'Работа названа неправильно';
    }
  }

  validateWorkFile(): boolean {
    return this.name === this.expectedFileName;
  }
}