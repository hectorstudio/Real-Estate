import { createSelector } from 'reselect';

const getUploadEntities = (state) => state.uploads.entities.uploads;
const getUploadIds = (state) => state.uploads.result;

export const getUploads = createSelector(
  getUploadIds,
  getUploadEntities,
  (ids, entities) => ids.map((id) => entities[id]),
);

export const getUpload = createSelector(
  getUploadEntities,
  (state, id) => id,
  (entities, id) => entities[id],
);
