export function validateDiscipline(portfolioDemands, portfolio): boolean {
  const works = portfolio.works;
  let disciplineValidated = false;

  works.map(work => {
    const workType = work.workType;
    const demandWorks = portfolioDemands.find(
        demandWork => demandWork.type === workType);
    const demandWorkNumbers = demandWorks.workNumbers;

    disciplineValidated = demandWorkNumbers.every(
        workNumber => work[workNumber] && work[workNumber].status);
  });

  return disciplineValidated;
}