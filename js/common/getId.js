import cyrillicToTranslit from 'cyrillic-to-translit-js';

export function getGroupId(groupName) {
  return cyrillicToTranslit().transform(groupName);
}

export function getStudentId(groupName: string, studentFullName: string | {}) {
  let name = '';

  if (typeof studentFullName === 'string') {
    name = studentFullName;
  } else {
    name = `${studentFullName.surname} ${studentFullName.name} ${studentFullName.patronimyc}`
  }

  return cyrillicToTranslit().transform(`${groupName}_${name}`, '_');
}

export function getDisciplineId(disciplineName, type) {
  return cyrillicToTranslit().transform(`${type}_${disciplineName}`);
}