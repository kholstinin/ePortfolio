import getMonthName from './getMonthName';
import {getNameWithInitials, getStringFullName} from './nameSplit';
import {studDB, discDB} from '../common/databases';
import {getDisciplineId, getGroupId} from './getId';

const JSZip = require('jszip');
const Docxtemplater = require('docxtemplater');
const fs = require('fs');

export default function createReference(discipline): Promise<string> {
  const currentPath = process.cwd();
  const content = fs.readFileSync(currentPath + '/spravka.docx',
      'binary');
  const zip = new JSZip(content);
  const doc = new Docxtemplater();
  doc.loadZip(zip);

  const studentId = getGroupId(discipline.groupName);
  const disciplineId = getDisciplineId(discipline.fullName,
      discipline.studyType);

  return studDB.get(studentId).then(studentInfo => {
    return discDB.get(disciplineId).then(discInfo => {
      console.log(studentInfo);
      console.log(discInfo);

      const dateNow = new Date();
      doc.setData({
        groupName: discipline.groupName,
        studentFullName: getStringFullName(discipline.studentFullName),
        disciplineName: discipline.fullName,
        direction: studentInfo.direction,
        profile: studentInfo.profile,
        day: dateNow.getDate(),
        month: getMonthName(dateNow.getMonth()),
        year: dateNow.getFullYear(),
        practicalWorks: '14',
        laboratoryWorks: '-',
        courseWork: '-',
        independentWorks: '-',
        homeWorks: '-',
        studentName: getNameWithInitials(discipline.studentFullName),
        professorName: getNameWithInitials(discInfo.professor),
        masterName: '',
      });

      try {
        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
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
        // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
        throw error;
      }

      return doc.getZip().generate({type: 'nodebuffer'});
    });
  });
}