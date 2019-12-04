import { createSelector } from 'reselect';

const getBuildingEntities = (state) => state.buildings.entities.buildings;
const getBuildingIds = (state) => state.buildings.result;

export const getBuildings = createSelector(
  getBuildingIds,
  getBuildingEntities,
  (ids, entities) => ids.map((id) => entities[id]),
);
