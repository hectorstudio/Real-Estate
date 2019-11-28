import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import files from './files';
import message from './message';
import user from './user';
import users from './users';

export default (history) => combineReducers({
  files,
  message,
  router: connectRouter(history),
  user,
  users,
});
