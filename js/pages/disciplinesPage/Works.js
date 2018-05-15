import type {TWorkObj} from '../../typings/Common';

export default class Works {
  works: [];

  constructor(works: Array<TWorkObj>) {
    this.works = works;
  }

  getPracticalWorkNumbers(): string {
    const practicalWorks = this._searchByWorkType('Практические работы');
    if (!practicalWorks) {
      return '';
    }

    return practicalWorks.workNumbers.join(' ');
  }

  getLaboratoryWorkNumbers(): string {
    const laboratoryWorks = this._searchByWorkType('Лабораторные работы');
    if (!laboratoryWorks) {
      return '';
    }

    return laboratoryWorks.workNumbers.join(' ');
  }

  getIndependentWorkNumbers(): string {
    const independentWorks = this._searchByWorkType('Самостоятельные работы');
    if (!independentWorks) {
      return '';
    }

    return independentWorks.workNumbers.join(' ');
  }

  getHomeworkNumbers(): string {
    const homeworks = this._searchByWorkType('Домашние контрольные работы');
    if (!homeworks) {
      return '';
    }

    return homeworks.workNumbers.join(' ');
  }

  getCourseWork(): boolean {
    return !!this._searchByWorkType('Курсовая работа');
  }

  getCourseProject(): boolean {
    return !!this._searchByWorkType('Курсовой проект');
  }

  _searchByWorkType(workType: string): ?Array<string> {
    return this.works.find(work => work.type === workType);
  }
}