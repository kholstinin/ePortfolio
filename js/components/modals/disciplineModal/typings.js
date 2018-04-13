import type {TDisciplineInfo} from '../../../typings/Discipline';
import type {TStudyType} from '../../../typings/Common';

export type TDisciplineModalProps = {
  onAddClick: (TDisciplineInfo) => void,
  closeModal: () => void
}

export type TDisciplineModalState = {
  fullName: string,
  shortName: string,
  type: TStudyType,
  practical: string,
  laboratory: string,
  course: boolean,
  independent: string,
}