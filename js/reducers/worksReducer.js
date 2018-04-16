import {ADD_UNVERIFIED_WORK, ADD_WRONG_WORK, CLEAR_WORKS} from './actionTypes';

export default function works(state = {unverifiedWorks: [], wrongWorks: []}, action) {
  switch (action.type) {
    case ADD_UNVERIFIED_WORK:
      return {...state, unverifiedWorks: state.unverifiedWorks.concat(action.work)};
    case ADD_WRONG_WORK:
      return {...state, wrongWorks: state.wrongWorks.concat(action.work)};
    case CLEAR_WORKS:
      return {...state, wrongWorks: [], unverifiedWorks: []};
    default:
      return state;
  }
}