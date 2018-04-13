import type {TStudyType, TWorkObj} from './Common';

export type TDiscipline = {
  _id: string,
  ...TDisciplineInfo
}

export type TDisciplineInfo = {
  fullName: string,
  shortName: string,
  type: TStudyType,
  works: Array<TWorkObj>,
}