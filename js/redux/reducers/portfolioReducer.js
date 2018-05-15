import {SET_PORTFOLIO} from '../actions/actionTypes';

export default function portfolio(state = {status: null}, action) {
  switch (action.type) {
    case SET_PORTFOLIO:
      return {...state, status: action.portfolioStatus};
    default:
      return state;
  }
}