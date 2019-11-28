import { normalize } from 'normalizr';

import initialState from '../initialState';
import { RECEIVE_USERS } from '../actions/types';
import { userSchema } from '../schemas';

export default (state = initialState.users, action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return normalize(action.payload, [userSchema]);
    default:
      return state;
  }
};
