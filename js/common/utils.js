import studyTypes from '../../data/studyType';

type TStudent = {
  name: string,
  surname: string,
  patronymic: string,
}

function getSeparator(str) {
  const space = ' ';
  const tableSpace = '\r';

  const splitBySpace = str.split(space);
  if (splitBySpace.length === 1) {
    return tableSpace;
  }

  return space;
}

export function splitStudent(studentFullName: string): TStudent {
  const separator = getSeparator(studentFullName);
  const splitName = studentFullName.split(separator);

  return {
    surname: splitName[0],
    name: splitName[1],
    patronymic: splitName[2],
  };
}

export function getStudentName(student: TStudent) {
  return `${student.surname} ${student.name} ${student.patronymic}`;
}

export function getDocs(arrOfDocs) {
  return arrOfDocs.map(item => item.doc);
}

function getDisciplineType(discipline) {
  const disciplinesTuple = {
    'course': 'Курсовая работа',
    'practical': 'Практические работы',
    'independent': 'Самостоятельные работы',
    'laboratory': 'Лабораторные работы',
  };

  return disciplinesTuple[discipline];
}

export function getWorkObj(work: string, workNumbers: Array<string>) {
  return {
    'type': getDisciplineType(work),
    workNumbers,
  };
}

export function getStudyTypes(): Array<{}> {
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