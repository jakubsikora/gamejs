import { PRESS_UP } from './actionTypes';

export function keys(state = {}, action) {
  switch (action.type) {
    case PRESS_UP:
      return { ...state, keyUp: true };
    default:
      return state;
  }
}
