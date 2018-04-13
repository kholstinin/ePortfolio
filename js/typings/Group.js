import type {TStudentFullName} from './StudentFullName';
import type {TStudyType} from './Common';

export type TGroup = {
  _id: string,
  name: string,
  students: Array<TStudentFullName>,
  profile: string,
  direction: string,
  type: TStudyType,
}

export type TGroupInfo = {
  groupName: string,
  students: Array<TStudentFullName>,
  profile: string,
  direction: string,
  studyType: TStudyType,
}