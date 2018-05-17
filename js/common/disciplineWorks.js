import type {TWorkObj} from '../typings/Common';

export default class DisciplineWorks {
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

  getPracticalWorksNumber(): string {
    const practicalWorks = this._searchByWorkType('Практические работы');
    console.log(practicalWorks);
    return (practicalWorks && practicalWorks.workNumbers.length) || '-';
  }

  getLaboratoryWorkNumbers(): string {
    const laboratoryWorks = this._searchByWorkType('Лабораторные работы');
    if (!laboratoryWorks) {
      return '';
    }

    return laboratoryWorks.workNumbers.join(' ');
  }

  getLaboratoryWorksNumber(): string {
    const laboratoryWorks = this._searchByWorkType('Лабораторные работы');
    return laboratoryWorks && laboratoryWorks.workNumbers.length || '-';
  }

  getIndependentWorkNumbers(): string {
    const independentWorks = this._searchByWorkType('Самостоятельные работы');
    if (!independentWorks) {
      return '';
    }

    return independentWorks.workNumbers.join(' ');
  }

  getIndependentWorksNumber(): string {
    const independentWorks = this._searchByWorkType('Самостоятельные работы');
    return independentWorks && independentWorks.workNumbers.length || '-';
  }

  getHomeworkNumbers(): string {
    const homeworks = this._searchByWorkType('Домашние контрольные работы');
    if (!homeworks) {
      return '';
    }

    return homeworks.workNumbers.join(' ');
  }

  getHomeworksNumber(): string {
    const homeworks = this._searchByWorkType('Домашние контрольные работы');
    return homeworks && homeworks.workNumbers.length || '-';
  }

  getCourseWork(): boolean {
    return !!this._searchByWorkType('Курсовая работа');
  }

  getCourseProject(): boolean {
    return !!this._searchByWorkType('Курсовой проект');
  }

  getAllWorksNumber(): number {
    let worksNumber = 0;
    this.works.forEach(work => {
      worksNumber += work.workNumbers.length
    });

    return worksNumber;
  }

  _searchByWorkType(workType: string): ?Array<string> {
    return this.works.find(work => work.type === workType);
  }

  static searchByWorkType(works: Array<TWorkObj>, workType: string): ?Array<string> {
    return works.find(work => work.type === workType);
  }
}