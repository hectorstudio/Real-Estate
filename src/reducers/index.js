import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import files from './files';
import message from './message';
import user from './user';
import users from './users';
import uploads from './uploads';
import buildings from './buildings';

export default (history) => combineReducers({
  buildings,
  files,
  message,
  router: connectRouter(history),
  uploads,
  user,
  users,
});
