import works from '../../../data/works';

export default class Work {
  workName = '';
  numberOfWorks = 0;

  constructor(tree: dirTree) {
    this.workName = tree.name;
    this.numberOfWorks = tree.children.length;
  }

  validateNumberOfWork(needNumberOfWork: number) {
    return this.numberOfWorks === needNumberOfWork;
  }
}