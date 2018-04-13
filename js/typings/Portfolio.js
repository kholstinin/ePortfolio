import type {TStudentFullName} from './StudentFullName';

export type TStudentPortfolio = {
  _id: string,
  name: TStudentFullName,
  group: string,
  portfolio: Array<TDisciplinePortfolio>
}

export type TDisciplinePortfolio = {
  disciplineName: string,
  works: Array<TDisciplineWorks>,
  isDone: boolean,
  referencePrinted: boolean
}

export type TDisciplineWorks = {
  workType: string,
  [number]: TWorkStatus
}

export type TWorkStatus = {
  status: boolean,
  error?: string,
}




