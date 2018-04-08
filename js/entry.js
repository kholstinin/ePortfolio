import React from 'react';
import ReactDOM from 'react-dom';

const storage = require('electron-json-storage');
import {injectGlobal} from 'styled-components';
//PouchDB.plugin(require('pouchdb-find'));

import App from './components/App';

injectGlobal`
  *, *:before, *:after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-size: 16px;
  }
  
  html, body: {
    height: 100%;
  }
`;

const currentPath = process.cwd();
storage.setDataPath(currentPath + '/storage');

ReactDOM.render(<App/>, document.getElementById('content'));