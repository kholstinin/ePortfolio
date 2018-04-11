import PouchDB from 'pouchdb-browser';

const portfDBurl = 'https://79df10c6-9673-4d5f-afc4-d981ed85f629-bluemix.cloudant.com/portfolio';
const remotePortfDB = new PouchDB(portfDBurl, {
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

const discDBurl = 'https://79df10c6-9673-4d5f-afc4-d981ed85f629-bluemix.cloudant.com/disciplines';
const remoteDiscDB = new PouchDB(studDBurl, {
  auth: {
    username: 'cheduchenestionsipestage',
    password: '54e9e4f46525f7b411e6143cade1d11cf475547a',
  },
});

export const studDB = new PouchDB('students');
studDB.sync(remoteStudDB);

export const portfDB = new PouchDB('portfolio');
//portfDB.sync(remotePortfDB);

export const discDB = new PouchDB('demandWorks');
