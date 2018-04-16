import {SHOW_WARNING_MODAL, SET_MODAL_INFO} from './actionTypes';

type TWarningModalInfo = {
  confirmActionText: string,
  warningText: string,
}

export default function warningModal(state = {visible: false, info: {}}, action) {
  switch (action.type) {
    case SHOW_WARNING_MODAL:
      return {...state, visible: action.visible};
    case SET_MODAL_INFO:
      return {...state, info: action.info};
    default:
      return state;
  }
}