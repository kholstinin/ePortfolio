import {LOADING_BEGIN, LOADING_END} from './actionTypes';

export default function loading(state = {status: false}, action) {
  switch (action.type) {
    case LOADING_BEGIN:
      return {...state, status: true};
    case LOADING_END:
      return {...state, status: false};
    default:
      return state;
  }
}