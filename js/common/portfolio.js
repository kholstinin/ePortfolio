import FileSystem from './fileSystem';

const dirTree = require('directory-tree');

export default class Portfolio {
  pathToRoot = null;
  groups = [];
  tree = null;

  constructor(pathToRootDir: string) {
    this.pathToRoot = pathToRootDir;
    this.tree = dirTree(pathToRootDir);

    this.getListOfGroups();
  }

  getListOfGroups() {
    this.groups = this.tree.children.map(item => item.name);
  }

  getListOfStudentsInGroup(groupName: string): Array<?string> {
    if (this.groups.indexOf(groupName) !== -1) {
      const groupTree = this.tree.children.filter(
          item => item.name === groupName)[0];
      return groupTree.children.map(item => item.name);
    } else {
      return [];
    }
  }

  getListOfDisciplinesInStudentDir(studentName: string): Array<?string> {

  }
}