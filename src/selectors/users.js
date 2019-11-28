import { createSelector } from 'reselect';

const getUserEntities = (state) => state.users.entities.users;
const getUserIds = (state) => state.users.result;

export const getUsers = createSelector(
  getUserIds,
  getUserEntities,
  (ids, entities) => ids.map((id) => entities[id]),
);
