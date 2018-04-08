import Student from './student';
import PouchDB from 'pouchdb-browser';
import {getGroupId} from '../getId';

export default class Group {
  students = [];
  studentsTree = [];
  name = '';

  constructor(tree) {
    this.studentsTree = tree.children;
    this.name = tree.name;
  }

  initialiseGroup(): Promise<any> {
    const db = new PouchDB('students');
    const id = getGroupId(this.name);

    return db.get(id).then(doc => {
      if (doc) {
        this.students = this.studentsTree.map(
            student => new Student(student, this.name, doc.students));
      } else {
        this.err = 'Нет такой группы';
      }
    });
  }
}