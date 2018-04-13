import {splitStudent} from './utils';
import type {TStudentFullName} from '../typings/StudentFullName';

type fileInfo = {
  group: string,
  name: string,
  discipline: string,
  workType: string,
  workNumber: string,
}

function convertWorkAbbr(workAbbr: string) {
  const works = {
    'ПР': 'Практические работы',
    'ЛР': 'Лабораторные работы',
    'КР': 'Курсовые работы',
    'СР': 'Самостоятельные работы',
  };

  const workName = works[workAbbr];

  if (workName) {
    return workName;
  }
  return 'Wrong name';
}

export function getInfoFromFileName(fileName: string): fileInfo {
  const arrOfInfo = fileName.split('_');
  const workName = arrOfInfo[3].split('.')[0];

  const workType = convertWorkAbbr(workName[0] + workName[1]);
  const workNumber = parseInt(workName.substring(2), 10);

  return {
    group: arrOfInfo[0],
    name: arrOfInfo[1],
    discipline: arrOfInfo[2],
    workType,
    workNumber,
  };
}

export function getFileNameFromInfo(
    group: string, fullName: string, discipline: string, workType: string,
    workNumber: string): string {
  return `${group}_${getNameWithInitials(
      fullName)}_${discipline}_${workType}${workNumber}.pdf`;
}

function splitName(fullName: string): TStudentFullName {
  const splitName = fullName.split(' ');
  return {
    name: splitName[1],
    surname: splitName[0],
    patronymic: splitName[2]
  }
}

export function getNameWithInitials(fullName: {} | string): string {
  let fullNameObj;

  if (typeof fullName === 'string') {
    fullNameObj = splitName(fullName);
  } else if (typeof fullName === 'object') {
    fullNameObj = fullName;
  } else {
    throw new Error('Неправильное имя');
  }

  const initials = `${fullNameObj.name[0]}${fullNameObj.patronymic[0]}`;

  return `${fullNameObj.surname} ${initials}`;
}

export function getWorkTypeAbbr(workType: string): string {
  const splitWorkType = workType.split(' ');
  const firstSymbol = splitWorkType[0][0].toUpperCase();
  const secondSymbol = splitWorkType[1][0].toUpperCase();
  return firstSymbol + secondSymbol;
}