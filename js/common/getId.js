import cyrillicToTranslit from 'cyrillic-to-translit-js';

import type {TStudentFullName} from '../typings/StudentFullName';

export function getGroupId(groupName: string): string {
  return cyrillicToTranslit().transform(groupName);
}

export function getStudentId(groupName: string, studentFullName: string | TStudentFullName): string {
  let name = '';

  if (typeof studentFullName === 'string') {
    name = studentFullName;
  } else {
    name = `${studentFullName.surname} ${studentFullName.name} ${studentFullName.patronymic}`
  }

  return cyrillicToTranslit().transform(`${groupName}_${name}`, '_');
}

export function getDisciplineId(disciplineName: string, type: string): string {
  return cyrillicToTranslit().transform(`${type}_${disciplineName}`, '_');
}