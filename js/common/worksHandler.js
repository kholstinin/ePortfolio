class WorksHandler {
  unverifiedWorks = [];
  wrongWorks = [];

  constructor() {

  }

  addUnverifiedWork(work: any): void {
    this.unverifiedWorks.push(work);
  }

  getUnverifiedWorks(): Array<any> {
    return this.unverifiedWorks;
  }

  addWrongWork(work: any): void {
    this.wrongWorks.push(work);
  }

  getWrongWorks(): Array<any> {
    return this.wrongWorks;
  }

  clearAll(): void {
    this.unverifiedWorks = [];
    this.wrongWorks = [];
  }
}

const handler = new WorksHandler();
export default handler;