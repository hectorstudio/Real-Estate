import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import message from './message';
import user from './user';

export default (history) => combineReducers({
  message,
  router: connectRouter(history),
  user,
});
