import Discipline from './discipline';
import {getNameWithInitials} from '../nameSplit';
import {getStudentId} from '../getId';

import store from '../../reducers/store';
import {addWrongWork} from '../../reducers/actions';

import {portfDB} from '../databases';
import type {TStudentFullName} from '../../typings/StudentFullName';
import type {TStudyType} from '../../typings/Common';

export default class Student {
  disciplines = [];
  name = '';
  path = '';
  fullName = '';
  groupName = '';
  studyType = '';

  _disciplineTree = [];
  _allStudents = [];

  constructor(
      tree: dirTree, groupName: string, allStudents: Array<TStudentFullName>,
      type: TStudyType) {
    this._disciplineTree = tree.children;
    this._allStudents = allStudents;

    this.path = tree.path;
    this.name = tree.name;
    this.groupName = groupName;
    this.studyType = type;
  }

  initialiseStudent() {
    if (this._validateStudentName()) {
      const id = getStudentId(this.groupName, this.fullName);

      return portfDB.get(id).catch(err => {
        if (err.name === 'not_found') {
          const doc = {
            _id: id,
            name: this.fullName,
            group: this.groupName,
            portfolio: [],
          };

          portfDB.put(doc);
          return doc;
        }
      }).then(portfolioStatus => {
        this.disciplines = this._disciplineTree.map(
            discipline => new Discipline(discipline, this.groupName,
                this.fullName,
                portfolioStatus, this.studyType),
        );
      });
    } else {
      this.err = 'Нет такого студента';
      store.dispatch(addWrongWork(this));
    }
  }

  _validateStudentName(): boolean {
    const fullName = this._allStudents.find((studentFullName) => {
      const nameWithInitials = getNameWithInitials(studentFullName);
      return nameWithInitials === this.name;
    });
    this.fullName = fullName;

    return !!fullName;
  }
}