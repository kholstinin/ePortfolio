import Group from './group';

export default class Portfolio {
  groups = [];

  numberOfWorks = 0;
  numberOfVerifiedWorks = 0;

  constructor(tree: dirTree) {
    const groupArrTree = tree.children;
    this.groups = groupArrTree.map(group => new Group(group));
  }

  countWorks() {
    this.groups.forEach(group => {
      group.countWorks();
      this.numberOfWorks += group.numberOfWorks;
      this.numberOfVerifiedWorks += group.numberOfVerifiedWorks;
    });
  }
}