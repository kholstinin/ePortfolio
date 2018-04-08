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

    console.log(studentPromises);

    return Promise.all(studentPromises);
  });
}