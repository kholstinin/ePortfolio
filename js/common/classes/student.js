import Discipline from './discipline';
import {getNameWithInitials} from '../nameSplit';
import {getStudentId} from '../getId';

import PouchDB from 'pouchdb-browser';

export default class Student {
  disciplines = [];
  name = '';
  fullName = '';
  groupName = '';
  disciplineTree = [];
  allStudents = [];

  constructor(tree, groupName, allStudents) {
    this.disciplineTree = tree.children;
    this.name = tree.name;
    this.groupName = groupName;
    this.allStudents = allStudents;
  }

  initialiseStudent() {
    if (this._validateStudentName()) {
      const db = new PouchDB('portfolio');
      const id = getStudentId(this.groupName, this.fullName);

      return db.get(id).catch(err => {
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
            discipline => {
              console.log(portfolioStatus);
              return new Discipline(discipline, this.groupName, this.name,
                  portfolioStatus);
            },
        );
      });

    } else {
      this.err = 'Нет такого студента';
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