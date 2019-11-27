import { SET_MESSAGE } from '../actions/types';
import initialState from '../initialState';

export default (state = initialState.message, action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return action.payload || null;
    default:
      return state;
  }
};
