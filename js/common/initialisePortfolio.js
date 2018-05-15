export default function initialisePortfolio(portfolio) {
  const groups = portfolio.groups;
  const groupPromises = [];

  groups.forEach(group => {
    groupPromises.push(group.initialiseGroup());
  });

  return Promise.all(groupPromises).then(() => {
    const studentPromises = [];

    groups.forEach(group => {
      const students = group.students;
      students.forEach(student => {
        studentPromises.push(student.initialiseStudent());
      });
    });

    return Promise.all(studentPromises);
  }).then(() => {
    const disciplinePromises = [];

    groups.forEach(group => {
      const students = group.students;
      students.forEach(student => {
        const disciplines = student.disciplines;
        disciplines.forEach(discipline => {
          disciplinePromises.push(discipline.initialiseDiscipline())
        });
      });
    });

    return Promise.all(disciplinePromises);
  });
}