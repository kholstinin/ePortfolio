import {splitStudent} from './utils';

type fileInfo = {
  group: string,
  name: string,
  discipline: string,
  workType: string,
  workNumber: number,
}

function convertWorkAbbr(workAbbr: string) {
  const works = {
    'ПР': 'Практическая работа',
    'ЛР': 'Лабораторная работа',
    'КР': 'Курсовая работа',
    'СР': 'Самостоятельная работа',
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
    group, nameWithInitials, discipline, workType, workNumber) {
  return `${group}_${nameWithInitials}_${discipline}_${workType}${workNumber}.pdf`;
}

export function getNameWithInitials(fullName: {}): string {
  const initials = `${fullName.name[0]}${fullName.patronymic[0]}`;

  return `${fullName.surname} ${initials}`;
}

export function getWorkTypeAbbr(workType: string) {
  const splitWorkType = workType.split(' ');
  const firstSymbol = splitWorkType[0][0].toUpperCase();
  const secondSymbol = splitWorkType[1][0].toUpperCase();
  return firstSymbol + secondSymbol;
}