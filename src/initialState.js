import { normalize } from 'normalizr';

import {
  buildingSchema,
  fileSchema,
  uploadSchema,
  userSchema,
} from './schemas';

export default {
  buildings: normalize({}, [buildingSchema]),
  files: normalize({}, [fileSchema]),
  message: null,
  uploads: normalize({}, [uploadSchema]),
  user: {},
  users: normalize({}, [userSchema]),
};
