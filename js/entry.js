import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './redux/store';

const storage = require('electron-json-storage');
import {injectGlobal} from 'styled-components';

import fontawesome from '@fortawesome/fontawesome';
import faSync from '@fortawesome/fontawesome-free-solid/faSync';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';
import faTimesCircle from '@fortawesome/fontawesome-free-solid/faTimesCircle';
import angleRight from '@fortawesome/fontawesome-free-solid/faAngleRight';
import angleLeft from '@fortawesome/fontawesome-free-solid/faAngleLeft';
import pencil from '@fortawesome/fontawesome-free-solid/faPencilAlt';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';

fontawesome.library.add(faSync, faTimes, faTimesCircle, angleRight, angleLeft,
    pencil, faCheck);

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