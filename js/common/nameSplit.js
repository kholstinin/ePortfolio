type fileInfo = {
  group: string,
  name :string,
  discipline: string,
  workType: string,
  workNumber: number,
}

export default function getInfoFromFileName(fileName: string): fileInfo {
    const arrOfInfo = fileName.split('_');
    const workName = arrOfInfo[3].split('.')[0];

    const workType = workName[0] + workName[1];
    const workNumber = parseInt(workName.substring(2), 10);

    return {
      group: arrOfInfo[0],
      name :arrOfInfo[1],
      discipline: arrOfInfo[2],
      workType,
      workNumber,
    };
}