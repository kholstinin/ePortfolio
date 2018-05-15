import type {TDisciplineInfo} from '../../../typings/Discipline';
import type {TStudyType} from '../../../typings/Common';

export type TDisciplineModalProps = {
  clickAction: (TDisciplineInfo) => void,
  closeModal: () => void
}

export type TDisciplineModalState = {
  fullName: string,
  shortName: string,
  type: TStudyType,
  practical: string,
  laboratory: string,
  courseWork: boolean,
  independent: string,
}