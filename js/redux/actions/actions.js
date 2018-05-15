import {
  ADD_REFERENCE,
  ADD_UNVERIFIED_WORK,
  ADD_WRONG_WORK,
  CHANGE_ROUTE,
  CLEAR_REFERENCES,
  CLEAR_WORKS, HIDE_MODAL,
  HIDE_WARNING_MODAL,
  LOADING_BEGIN,
  LOADING_END,
  SET_PORTFOLIO,
  SHOW_MODAL,
  SHOW_WARNING_MODAL,
} from './actionTypes';
import * as React from 'react';

import initialisePortfolio from '../../common/initialisePortfolio';
import Portfolio from '../../common/classes/portfolio';
import {storage_portfolioKey} from '../../common/global';
import type {TWarningModalInfo} from '../reducers/warningModalReducer';

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

export function fullUpdatePortfolio() {
  return _updatePortfolio(true)
}

export function updatePortfolio() {
  return _updatePortfolio(false)
}

let tree = null;
function _updatePortfolio(withTree: boolean) {
  return (dispatch) => {
    dispatch(startLoading());

    storage.get(storage_portfolioKey, (err, data) => {
      dispatch(clearWorks());
      dispatch(clearReferences());

      const paths = data.paths;

      if (!paths || paths.length === 0) {
        dispatch(setPortfolio('empty'));
      } else {
        if (withTree) {
          tree = dirTree(paths[0]);
        }

        if (tree) {
          const portfolio = new Portfolio(tree);
          initialisePortfolio(portfolio).then(() => {
            portfolio.countWorks();
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
    discipline,
  };
}

export function clearReferences() {
  return {
    type: CLEAR_REFERENCES,
  };
}

export function hideWarningModal() {
  return {
    type: HIDE_WARNING_MODAL,
  };
}

export function showWarningModal(modalInfo: TWarningModalInfo) {
  return {
    type: SHOW_WARNING_MODAL,
    info: modalInfo,
  };
}

export function showModal(info: {content: React.Component, title: string}) {
  return {
    type: SHOW_MODAL,
    info: info,
  };
}

export function hideModal() {
  return {
    type: HIDE_MODAL,
  }
}