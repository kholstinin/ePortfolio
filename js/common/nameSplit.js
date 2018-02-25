type fileInfo = {
  group: string,
  name :string,
  discipline: string,
  workType: string,
  workNumber: number,
}

export function getInfoFromFileName(fileName: string): fileInfo {
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

export function getNameWithInitials(fullName: string): string {
  const splitName = fullName.split(' ');
  const surname = splitName[0];
  const initials = `${splitName[1][0]}.${splitName[2][0]}`;

  return `${surname} ${initials}`
}