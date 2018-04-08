import cyrillicToTranslit from 'cyrillic-to-translit-js';

export function getGroupId(groupName) {
  return cyrillicToTranslit().transform(groupName);
}

export function getStudentId(groupName: string, studentFullName: string) {
  return cyrillicToTranslit().transform(`${groupName}_${studentFullName}`, '_');
}