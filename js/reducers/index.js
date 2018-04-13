import {combineReducers} from 'redux';

import router from './routerReducer'

const AppReducer = combineReducers({
  router
});

export default AppReducer;