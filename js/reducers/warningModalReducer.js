import {
  SHOW_WARNING_MODAL,
  HIDE_WARNING_MODAL,
} from './actionTypes';

export type TWarningModalInfo = {
  confirmActionText: string,
  warningText: string,
  onConfirmClose: () => void,
}

type TWarningModalState = {
  visible: boolean,
  info: TWarningModalInfo
}

const initialState: TWarningModalState = {
  visible: false,
  info: {
    confirmActionText: '',
    warningText: '',
    onConfirmClose: () => {
    },
  },
};

export default function warningModal(state = initialState, action) {
  switch (action.type) {
    case SHOW_WARNING_MODAL:
      return {...state, visible: true, info: action.info};
    case HIDE_WARNING_MODAL:
      return {...state, visible: false, info: {}};
    default:
      return state;
  }
}