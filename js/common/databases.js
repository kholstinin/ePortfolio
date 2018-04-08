import PouchDB from 'pouchdb-browser';

const portfolioDBurl = 'https://79df10c6-9673-4d5f-afc4-d981ed85f629-bluemix.cloudant.com/portfolio';
const remotePortfolioDB = new PouchDB(portfolioDBurl, {
  auth: {
    username: 'ificandhossithollinceend',
    password: '64fa85bd5e1c39214f067bf24ca344205a8f3a9f',
  },
});

const studDBurl = 'https://79df10c6-9673-4d5f-afc4-d981ed85f629-bluemix.cloudant.com/students';
const remoteStudDB = new PouchDB(studDBurl, {
  auth: {
    username: 'cheduchenestionsipestage',
    password: '54e9e4f46525f7b411e6143cade1d11cf475547a',
  },
});

export const studDB = new PouchDB('students');
studDB.sync(remoteStudDB);

export const portfolioDB = new PouchDB('portfolio');
//portfolioDB.sync(remotePortfolioDB);

export const demandWorksDB = new PouchDB('demandWorks');