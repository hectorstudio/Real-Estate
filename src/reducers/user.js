import { SAVE_USER } from '../actions/types';
import initialState from '../initialState';

export default (state = initialState.user, action) => {
  switch (action.type) {
    case SAVE_USER:
      return action.payload;
    default:
      return state;
  }
};
