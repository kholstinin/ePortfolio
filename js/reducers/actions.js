import {
  ADD_UNVERIFIED_WORK,
  ADD_WRONG_WORK,
  CHANGE_ROUTE,
  LOADING_BEGIN,
  LOADING_END,
  SET_PORTFOLIO,
  CLEAR_WORKS, ADD_REFERENCE,
} from './actionTypes';

import initialisePortfolio from '../common/initialisePortfolio';
import Portfolio from '../common/classes/portfolio';
import {storage_portfolioKey} from '../common/global';

const dirTree = require('directory-tree');

const storage = require('electron-json-storage');

//loading actions
export function startLoading() {
  return {
    type: LOADING_BEGIN,
  };
}

export function endLoading() {
  return {
    type: LOADING_END,
  };
}

// route actions
export function changeRoute(route) {
  return {type: CHANGE_ROUTE, route};
}

//portfolio actions
export function setPortfolio(portfolioStatus) {
  return {type: SET_PORTFOLIO, portfolioStatus};
}

export function updatePortfolio() {
  return (dispatch) => {
    dispatch(startLoading());

    storage.get(storage_portfolioKey, (err, data) => {
      dispatch(clearWorks());
      const paths = data.paths;

      if (!paths || paths.length === 0) {
        dispatch(setPortfolio('empty'));
      } else {
        const tree = dirTree(paths[0]);

        if (tree) {
          const portfolio = new Portfolio(tree);
          initialisePortfolio(portfolio).then(() => {
            console.log(portfolio);
            dispatch(setPortfolio(portfolio));
          });

        } else {
          dispatch(setPortfolio(null));
        }
      }
      dispatch(endLoading());
    });

  };
}

//worksHandler actions

export function addUnverifiedWork(work) {
  return {
    type: ADD_UNVERIFIED_WORK,
    work,
  };
}

export function addWrongWork(work) {
  return {
    type: ADD_WRONG_WORK,
    work,
  };
}

export function clearWorks() {
  return {
    type: CLEAR_WORKS,
  };
}

//references actions

export function addReference(discipline) {
  return {
    type: ADD_REFERENCE,
    discipline
  }
}

