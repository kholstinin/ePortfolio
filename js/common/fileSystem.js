const fs = require('fs');

export default class FileSystem {
  static getFilesInDirectory(pathToDirectory: string): Array<string> {
    return fs.readdirSync(pathToDirectory);
  }
}