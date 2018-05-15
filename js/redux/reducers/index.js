import {combineReducers} from 'redux';

import router from './routerReducer'
import loading from './loadingReducer';
import portfolio from './portfolioReducer';
import works from './worksReducer';
import modal from './modalReducer';
import warningModal from './warningModalReducer';
import references from './referencesReducer';

const AppReducer = combineReducers({
  router,
  loading,
  portfolio,
  works,
  references,
  modal,
  warningModal,
});

export default AppReducer;