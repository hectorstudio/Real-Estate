import { createSelector } from 'reselect';
import { FILE_STATUS } from '../constants';

const getFileEntities = (state) => state.files.entities.files;
const getFileIds = (state) => state.files.result;

export const getFiles = createSelector(
  getFileIds,
  getFileEntities,
  (ids, entities) => ids.map((id) => entities[id]),
);

export const getFileById = createSelector(
  getFileEntities,
  (state, id) => id,
  (entities, id) => entities[id],
);

export const getUploadingFiles = createSelector(
  getFiles,
  (files) => files.filter((file) => file.status === FILE_STATUS.UPLOADING),
);
