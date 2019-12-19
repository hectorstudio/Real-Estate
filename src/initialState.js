import { normalize } from 'normalizr';

import {
  buildingSchema,
  fileSchema,
  portfolioSchema,
  uploadSchema,
  userSchema,
} from './schemas';

export default {
  buildings: normalize({}, [buildingSchema]),
  files: normalize({}, [fileSchema]),
  message: null,
  portfolios: normalize({}, [portfolioSchema]),
  uploads: normalize({}, [uploadSchema]),
  user: {},
  users: normalize({}, [userSchema]),
};
