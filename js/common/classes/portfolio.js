import Group from './group';

export default class Portfolio {
  groups = [];

  constructor(tree: dirTree) {
    const groupArrTree = tree.children;
    this.groups = groupArrTree.map(group => new Group(group));
  }
}