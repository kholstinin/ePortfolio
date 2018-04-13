import type {TStudyType} from '../../../typings/Common';
import type {TGroupInfo} from '../../../typings/Group';

export type TGroupModalProps = {
  addGroup: (TGroupInfo) => void,
  closeModal: () => void,
};

export type TGroupModalState = {
  groupName: string,
  students: string,
  profile: string,
  direction: string,
  studyType: TStudyType
}