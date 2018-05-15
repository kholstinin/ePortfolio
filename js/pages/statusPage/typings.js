import type {TStudentPortfolio} from '../../typings/Portfolio';

export type TStatusPageProps = {}

export type TStatusPageState = {
  portfolio: Array<TStudentPortfolio>,
  groups: Array<string>,
  activeGroup: string,
  activeStudent: TStudentPortfolio,
  activeDiscipline: string,
}
