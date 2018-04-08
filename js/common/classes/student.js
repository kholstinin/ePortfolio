import Discipline from './discipline';
import {getNameWithInitials} from '../nameSplit';
import {getStudentId} from '../getId';

import worksHandler from '../worksHandler';

import {portfolioDB} from '../databases';

export default class Student {
  disciplines = [];
  name = '';
  path = '';
  fullName = '';
  groupName = '';
  disciplineTree = [];
  allStudents = [];

  constructor(tree, groupName, allStudents) {
    this.disciplineTree = tree.children;
    this.path = tree.path;
    this.name = tree.name;
    this.groupName = groupName;
    this.allStudents = allStudents;
  }

  initialiseStudent() {
    if (this._validateStudentName()) {
      const id = getStudentId(this.groupName, this.fullName);

      return portfolioDB.get(id).catch(err => {
        if (err.name === 'not_found') {
          const doc = {
            _id: id,
            name: this.fullName,
            group: this.groupName,
            portfolio: [],
          };

          db.put(doc);
          return doc;
        }
      }).then(portfolioStatus => {
        this.disciplines = this.disciplineTree.map(
            discipline => new Discipline(discipline, this.groupName, this.name,
                portfolioStatus)
        );
      });

    } else {
      this.err = 'Нет такого студента';
      worksHandler.addWrongWork(this);
    }
  }

  _validateStudentName(): boolean {
    const fullName = this.allStudents.find((studentFullName) => {
      const nameWithInitials = getNameWithInitials(studentFullName);
      return nameWithInitials === this.name;
    });
    this.fullName = fullName;

    return !!fullName;
  }
}