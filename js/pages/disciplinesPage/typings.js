export type TDisciplinesPageProps = {

}

export type TDisciplinesPageState = {
  disciplineModalVisible: boolean,
  allDisciplines: Array<any>,
  disciplineInput: string,
  selectedDisciplineName: {
    fullName: string,
    shortName: string,
  }
}