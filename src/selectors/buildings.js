import { createSelector } from 'reselect';

const getBuildingEntities = (state) => state.buildings.entities.buildings;
const getBuildingPermissionEntities = (state) => state.buildings.entities.permissions;
const getBuildingIds = (state) => state.buildings.result;

export const getBuildings = createSelector(
  getBuildingIds,
  getBuildingEntities,
  (ids, entities) => ids.map((id) => entities[id]),
);

export const getBuildingById = createSelector(
  getBuildings,
  (state, id) => id,
  (buildings, id) => buildings.find((building) => building.id === id),
);

export const getBuildingPermissions = createSelector(
  getBuildingPermissionEntities,
  (entities) => (entities ? Object.values(entities) : []),
);

export const getBuildingPermissionsByBuildingId = createSelector(
  getBuildingPermissions,
  (state, id) => id,
  (buildingPermissions, id) => buildingPermissions.filter((x) => x.contentId === id),
);

export const getBuildingPermissionByBuildingIdAndUserId = createSelector(
  getBuildingPermissionsByBuildingId,
  (state, userId) => userId,
  (buildingPermissions, id) => buildingPermissions.filter((x) => x.userId === id),
);
