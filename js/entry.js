import React from 'react';
import ReactDOM from 'react-dom';

import Entry from "./components/App.jsx";

import {
  injectGlobalStyle,
  injectResetStyle,
} from 'reactackle';

injectGlobalStyle();
injectResetStyle();

ReactDOM.render(<Entry />, document.getElementById('content'));