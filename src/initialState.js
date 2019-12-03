import { normalize } from 'normalizr';

import { fileSchema, userSchema, uploadSchema } from './schemas';

export default {
  files: normalize({}, [fileSchema]),
  message: null,
  uploads: normalize({}, [uploadSchema]),
  user: {},
  users: normalize({}, [userSchema]),
};
