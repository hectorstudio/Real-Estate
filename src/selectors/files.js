import { createSelector } from 'reselect';

const getFileEntities = (state) => state.files.entities.files;
const getFileIds = (state) => state.files.result;

export const getFiles = createSelector(
  getFileIds,
  getFileEntities,
  (ids, entities) => ids.map((id) => entities[id]),
);
