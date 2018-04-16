import {combineReducers} from 'redux';

import router from './routerReducer'
import loading from './loadingReducer';
import portfolio from './portfolioReducer';
import works from './worksReducer';
import warningModal from './warningModalReducer';
import references from './referencesReducer';

const AppReducer = combineReducers({
  router,
  loading,
  portfolio,
  works,
  references,
  warningModal
});

export default AppReducer;