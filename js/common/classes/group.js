import Student from './student';
import {getGroupId} from '../getId';
import {studDB} from '../databases';

import store from '../../redux/store';
import {addWrongWork} from '../../redux/actions/actions';

export default class Group {
  _studentsTree = [];

  students = [];
  name = '';
  path = '';

  numberOfWorks = 0;
  numberOfVerifiedWorks = 0;

  constructor(tree: dirTree) {
    this._studentsTree = tree.children;
    this.name = tree.name;
    this.path = tree.path;
  }

  initialiseGroup(): Promise<any> {
    const id = getGroupId(this.name);

    return studDB.get(id).then(doc => {
      if (doc) {
        this.students = this._studentsTree.map(
            student => new Student(student, this.name, doc.students, doc.studyType));

      } else {
        store.dispatch(addWrongWork(this));
        this.err = 'Нет такой группы';
      }
    }).catch(err => {
      this.err = 'Нет такой группы';
      store.dispatch(addWrongWork(this));
    });
  }

  countWorks() {
    this.students.forEach(student => {
      student.countWorks();
      this.numberOfWorks += student.numberOfWorks;
      this.numberOfVerifiedWorks += student.numberOfVerifiedWorks;
    });
  }
}