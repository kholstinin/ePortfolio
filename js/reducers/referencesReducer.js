import {ADD_REFERENCE, CLEAR_REFERENCES} from './actionTypes';

export default function references(state = {disciplines: []}, action) {
  switch (action.type) {
    case ADD_REFERENCE:
      return {disciplines: state.disciplines.concat(action.discipline)};
    case CLEAR_REFERENCES:
      return {disciplines: []};
    default:
      return state;
  }
}