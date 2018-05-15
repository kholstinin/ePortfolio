import studyTypes from '../../data/studyTypes';

import type {TStudentFullName} from '../typings/StudentFullName';
import type {
  TDisciplineType,
  TWorkObj,
  TSelectOption,
  TStudyType,
} from '../typings/Common';

function getSeparator(str: string): string {
  const space = ' ';
  const tableSpace = '\r';

  const splitBySpace = str.split(space);
  if (splitBySpace.length === 1) {
    return tableSpace;
  }

  return space;
}

export function splitStudent(studentFullName: string): TStudentFullName {
  const separator = getSeparator(studentFullName);
  const splitName = studentFullName.trim().split(separator);

  return {
    surname: splitName[0],
    name: splitName[1],
    patronymic: splitName[2],
  };
}

export function getStudentName(student: TStudentFullName): string {
  return `${student.surname} ${student.name} ${student.patronymic}`;
}

export function getDocs(arrOfDocs) {
  return arrOfDocs.map(item => item.doc);
}

function getDisciplineType(discipline: string): TDisciplineType {
  const disciplinesTuple = {
    'courseWork': 'Курсовая работа',
    'homework': 'Домашние контрольные работы',
    'courseProject': 'Курсовой проект',
    'practical': 'Практические работы',
    'independent': 'Самостоятельные работы',
    'laboratory': 'Лабораторные работы',
  };

  return disciplinesTuple[discipline];
}

export function getWorkObj(work: string, workNumbers: Array<string>): TWorkObj {
  return {
    'type': getDisciplineType(work),
    workNumbers,
  };
}

export function getStudyTypes(): Array<TSelectOption> {
  const arrOfStudyTypes = [];

  for (const type in studyTypes) {
    if (studyTypes.hasOwnProperty(type)) {
      arrOfStudyTypes.push({
        value: type,
        label: studyTypes[type],
      });
    }
  }

  return arrOfStudyTypes;
}

export function compareStudents(
    student1: TStudentFullName, student2: TStudentFullName): boolean {
  return student1.name === student2.name &&
      student1.surname === student2.surname &&
      student1.patronymic === student2.patronymic;
}

export function printStudyType(studyType: TStudyType): string {
  return studyTypes[studyType];
}

export function getSingleWorkType(pluralWorkType: string) {
  const splitWorkType = pluralWorkType.split(' ');
  const workType = splitWorkType[0];
  return workType.slice(0, -2) + 'ая';
}

export function convertPluralWorkTypeToSingular(workType: string): string {
  const workTypes = {
    'Практические работы': 'Практическая работа',
    'Лабораторные работы': 'Лабораторная работа',
    'Самостоятельные работы': 'Самостоятельная работа',
    'Домашние контрольные работы': 'Домашняя контрольная работа'
  };

  if (workTypes[workType]) {
    return workTypes[workType];
  }

  return workType;
}