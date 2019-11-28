import { normalize } from 'normalizr';

import { fileSchema, userSchema } from './schemas';

export default {
  files: normalize({}, [fileSchema]),
  message: null,
  user: {},
  users: normalize({}, [userSchema]),
};
