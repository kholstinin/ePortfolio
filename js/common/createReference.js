import getMonthName from './getMonthName';
import {getNameWithInitials, getStringFullName} from './nameSplit';
import {studDB, discDB} from '../common/databases';
import {getDisciplineId, getGroupId} from './getId';

const JSZip = require('jszip');
const Docxtemplater = require('docxtemplater');
import DisciplineWorks from './disciplineWorks';

const fs = require('fs');

function getReferenceData(discipline): Promise<any> {
  const studentId = getGroupId(discipline.groupName);
  const disciplineId = getDisciplineId(discipline.fullName,
      discipline.studyType);

  return studDB.get(studentId).then(studentInfo => {
    return discDB.get(disciplineId).then(discInfo => {
      const works = new DisciplineWorks(discInfo.works);

      const dateNow = new Date();
      return {
            groupName: discipline.groupName,
            studentFullName: getStringFullName(discipline.studentFullName),
            disciplineName: discipline.fullName,
            direction: studentInfo.direction,
            profile: studentInfo.profile,
            day: dateNow.getDate(),
            month: getMonthName(dateNow.getMonth()),
            year: dateNow.getFullYear(),
            practicalWorks: works.getPracticalWorksNumber(),
            laboratoryWorks: works.getLaboratoryWorksNumber(),
            courseWork: +works.getCourseWork() || +works.getCourseProject() ||
            '-',
            independentWorks: works.getIndependentWorksNumber(),
            homeWorks: works.getHomeworksNumber(),
            studentName: getNameWithInitials(discipline.studentFullName, true),
            professorName: getNameWithInitials(discInfo.professor, true),
            masterName: 'Селиванова К.В.',
          }
    });
  });
}

export default function createReference(disciplines: Array<any>): Promise<string> {
  const currentPath = process.cwd();
  const content = fs.readFileSync(currentPath + '/spravka.docx',
      'binary');
  const zip = new JSZip(content);
  const doc = new Docxtemplater();
  doc.loadZip(zip);

  const data = {references: []};
  const arrOfPromises = [];

  disciplines.forEach(disc => {
    arrOfPromises.push(getReferenceData(disc).then(info => data.references.push(info)));
  });

  return Promise.all(arrOfPromises).then(() => {
    doc.setData(data);

    try {
      // do stuff
      doc.render();
    }
    catch (error) {
      const e = {
        message: error.message,
        name: error.name,
        stack: error.stack,
        properties: error.properties,
      };
      console.log(JSON.stringify({error: e}));

      throw error;
    }

    return doc.getZip().generate({type: 'nodebuffer'});
  });
}