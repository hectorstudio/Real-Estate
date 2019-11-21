import update from 'immutability-helper';
import { SET_ID_TOKEN, SET_USER } from '../actions/types';
import initialState from '../initialState';

export default (state = initialState.user, action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    case SET_ID_TOKEN:
      return update(state, {
        idToken: {
          $set: action.payload,
        },
      });
    default:
      return state;
  }
};
