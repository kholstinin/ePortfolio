import {CHANGE_ROUTE} from './actionTypes';

export default function router(state = {activeRoute: 'portfolio'}, action) {
  switch (action.type) {
    case CHANGE_ROUTE:
      return {...state, activeRoute: action.route};
    default:
      return state;
  }
}