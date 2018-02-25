import Group from '../js/common/classes/group';
import Student from '../js/common/classes/student';
import Discipline from '../js/common/classes/discipline';
const dirTree = require('directory-tree');

import {students, groups} from './fakeData';

const pathToRootDirectory = '/Портфолио';
const pathToGroup = pathToRootDirectory + '/ПЕ-41б';
const pathToStudent = pathToGroup + '/Холстинин Д.А';
const pathToDiscipline = pathToStudent + '/ООП';

const disciplineTree = dirTree(pathToDiscipline);
const groupTree = dirTree(pathToGroup);
const studentTree = dirTree(pathToStudent);

const group = new Group(groupTree, groups);
const student = new Student(studentTree, 'ПЕ-41б', students);
const discipline = new Discipline(disciplineTree);

describe('Тесты для класса дисциплины', () => {
  test('Название дисциплины', () => {
    const expected = 'ООП';
    expect(discipline.getNameOfDiscipline()).toEqual(expected);
  });

  // test('Название дисциплины есть в словаре', () => {
  //   expect(discipline.validateDisciplineName()).toBeTruthy();
  // });

  test('Поиск группы', () => {

  });

  test('Поиск студента', () => {

  })
});
