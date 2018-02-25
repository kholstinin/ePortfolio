import Student from './student';
import groups from '../../../data/groups';

export default class Group {
  students = [];
  groupName = '';
  groupsArr = [];

  constructor(tree, groupsArr) {
    const studentsArrTree = tree.children;
    this.groupName = tree.name;

    if (groupsArr) {
      this.groupsArr = groupsArr;
    } else {
      this.groupsArr = groups.arr;
    }

    if (this._validateGroupName()) {
      this.students = studentsArrTree.map(
          student => new Student(student, this.groupName));
    } else {
      this.err = 'Нет такой группы';
    }
  }

  _validateGroupName(): boolean {
    return this.groupsArr.includes(this.groupName);
  }
}