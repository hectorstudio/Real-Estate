import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import buildings from './buildings';
import files from './files';
import message from './message';
import portfolios from './portfolios';
import uploads from './uploads';
import user from './user';
import users from './users';

export default /* istanbul ignore next */ (history) => combineReducers({
  buildings,
  files,
  message,
  portfolios,
  router: connectRouter(history),
  uploads,
  user,
  users,
});
