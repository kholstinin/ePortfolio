export type TStudyType = 'fullTime' | 'partTime';

export type TWorkType = string;
export type TDisciplineType = string;

export type TWorkObj = {
  type: TDisciplineType,
  workNumbers: Array<string>,
}

export type TSelectOption = {
  label: string,
  value: string | number,
}

export type TRoute = string;