import initialState from './initialState';
import {CHANGE_ROUTE} from './actionTypes';

export default function router(state = initialState, action) {
  switch (action.type) {
    case CHANGE_ROUTE:
      return {...state, activeRoute: action.payload};
    default:
      return state;
  }
}