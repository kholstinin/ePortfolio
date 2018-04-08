class WorksHandler {
  unverifiedWorks = [];

  constructor() {

  }

  addUnverifiedWork(work: any): void {
    this.unverifiedWorks.push(work);
  }

  getUnverifiedWorks(): Array<any> {
    return this.unverifiedWorks;
  }

  addWrongWork() {

  }

  getWrongWorks() {

  }
}

const handler = new WorksHandler();
export default handler;