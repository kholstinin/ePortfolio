import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import fontawesome from '@fortawesome/fontawesome'

import angleRight from '@fortawesome/fontawesome-free-solid/faAngleRight';
import angleLeft from '@fortawesome/fontawesome-free-solid/faAngleLeft';

fontawesome.library.add(angleRight, angleLeft);

ReactDOM.render(<App/>, document.getElementById('root'));