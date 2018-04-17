import {CHANGE_ROUTE} from './actionTypes';

export default function router(state = {activeRoute: 'demands'}, action) {
  switch (action.type) {
    case CHANGE_ROUTE:
      return {...state, activeRoute: action.route};
    default:
      return state;
  }
}