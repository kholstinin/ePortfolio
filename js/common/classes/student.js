import Discipline from './discipline';
import students from '../../../data/students';
import {getNameWithInitials} from '../nameSplit';

export default class Student {
  disciplines = [];
  studentName = '';
  groupName = '';
  studentsArr = [];

  constructor(tree, groupName, studentsArr) {
    const disciplineArrTree = tree.children;
    this.studentName = tree.name;
    this.groupName = groupName;

    if (studentsArr) {
      this.studentsArr = studentsArr;
    } else {
      this.studentsArr = students;
    }

    if (this._validateStudentName()) {
      this.disciplines = disciplineArrTree.map(
          discipline => new Discipline(discipline));
    } else {
      this.err = 'Нет такого студента';
    }
  }

  _validateStudentName(): boolean {
    const studentsInGroup = this.studentsArr[this.groupName];
    return !!studentsInGroup.find((studentFullName) => {
      const nameWithInitials = getNameWithInitials(studentFullName);
      return nameWithInitials === this.studentName;
    })
  }
}