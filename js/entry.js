import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './reducers/store';

const storage = require('electron-json-storage');
import {injectGlobal} from 'styled-components';
//PouchDB.plugin(require('pouchdb-find'));

import fontawesome from '@fortawesome/fontawesome'
import faSync from '@fortawesome/fontawesome-free-solid/faSync';

fontawesome.library.add(faSync);

import App from './pages/App/App';

injectGlobal`
  *, *:before, *:after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-size: 16px;
    background-color: #fafafa;
  }
  
  html, body, #content {
    height: 100%;
  }
  
  #content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const currentPath = process.cwd();
storage.setDataPath(currentPath + '/storage');

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById('content'),
);