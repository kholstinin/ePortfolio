import {
  SHOW_MODAL,
  HIDE_MODAL,
} from '../actions/actionTypes';

type TModalState = {
  visible: boolean,
}

const initialState: TModalState = {
  visible: false,
};

export default function modal(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return {...state, visible: true, info: action.info};
    case HIDE_MODAL:
      return {...state, visible: false, content: null};
    default:
      return state;
  }
}