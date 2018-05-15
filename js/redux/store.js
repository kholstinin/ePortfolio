import {applyMiddleware, createStore} from 'redux';
import AppReducer from './reducers/index';
import thunk from 'redux-thunk';

const store = createStore(
    AppReducer,
    applyMiddleware(thunk),
);

export default store;