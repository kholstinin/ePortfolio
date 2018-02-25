import disciplines from '../../../data/disciplines';
import Work from './work';

export default class Discipline {
  disciplineName = '';
  works = [];
  disciplines = [];

  constructor(tree: dirTree, disciplinesArr) {
    this.disciplineName = tree.name;
    const worksArrTree = tree.children;

    if (disciplinesArr) {
      this.disciplines = disciplinesArr;
    } else {
      this.disciplines = disciplines.fullTime;
    }
    if (this._validateDisciplineName()) {
      this.works = worksArrTree.map(work => new Work(work));
    } else {
      this.err = 'Такой дисциплины не существует';
    }
  }

  _validateDisciplineName(): boolean {
    return !!this.disciplines[this.disciplineName];
  }

  validateWorks() {
    const needWorks = this.disciplines[this.disciplineName];
    console.log(needWorks);
  }
}