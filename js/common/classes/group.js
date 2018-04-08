import Student from './student';
import {getGroupId} from '../getId';
import {studDB} from '../databases';

import worksHandler from '../worksHandler';

export default class Group {
  students = [];
  studentsTree = [];
  name = '';
  path = '';

  constructor(tree) {
    this.studentsTree = tree.children;
    this.name = tree.name;
    this.path = tree.path;
  }

  initialiseGroup(): Promise<any> {
    const id = getGroupId(this.name);

    return studDB.get(id).then(doc => {
      if (doc) {
        this.students = this.studentsTree.map(
            student => new Student(student, this.name, doc.students));
      } else {
        worksHandler.addWrongWork(this);
        this.err = 'Нет такой группы';
      }
    }).catch(err => {
      worksHandler.addWrongWork(this);
      this.err = 'Нет такой группы';
    });
  }
}