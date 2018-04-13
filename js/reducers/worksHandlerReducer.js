import initialState from './initialState';
import {ADD_UNVERIFIED_WORK, ADD_WRONG_WORK} from './actionTypes';

export default function worksHandler(state = initialState, action) {
  switch (action.type) {
    case ADD_UNVERIFIED_WORK:
      return {...state, activeRoute: action.payload};
    case ADD_WRONG_WORK:
      return {...state};
    default:
      return state;
  }
}