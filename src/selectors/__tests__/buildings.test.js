import {
  getBuildingById,
  getBuildingPermissionByBuildingIdAndUserId,
  getBuildingPermissions,
  getBuildingPermissionsByBuildingId,
  getBuildings,
} from '../buildings';

let state;
beforeEach(() => {
  state = {
    buildings: {
      entities: {
        buildings: {
          1: { id: '1', name: 'foo' },
          2: { id: '2', name: 'bar' },
        },
        permissions: {
          1: {
            contentId: 'foo',
            id: '1',
            role: 'foo',
            type: 'building',
            userId: '1',
          },
          2: {
            contentId: 'bar',
            id: '2',
            role: 'foo',
            type: 'building',
            userId: '1',
          },
        },
      },
      result: ['1', '2'],
    },
  };
});

describe('getBuildings', () => {
  it('returns list of buildings', () => {
    const selection = getBuildings(state);

    expect(selection).toMatchObject([
      state.buildings.entities.buildings[1],
      state.buildings.entities.buildings[2],
    ]);
  });
});

describe('getBuildingById', () => {
  it('returns buildings by id', () => {
    const selection = getBuildingById(state, '1');

    expect(selection).toMatchObject(state.buildings.entities.buildings[1]);
  });
});

describe('getBuildingPermissions', () => {
  it('returns empty array if there are no permissons', () => {
    state.buildings.entities.permissions = undefined;
    const selection = getBuildingPermissions(state);

    expect(selection).toMatchObject([]);
  });

  it('returns list of permissions', () => {
    const { permissions } = state.buildings.entities;

    const selection = getBuildingPermissions(state);

    expect(selection).toMatchObject([permissions[1], permissions[2]]);
  });
});

describe('getBuildingPermissionsByBuildingId', () => {
  it('returns permissions by building id', () => {
    const selection = getBuildingPermissionsByBuildingId(state, 'foo');

    expect(selection).toMatchObject([state.buildings.entities.permissions[1]]);
  });
});

describe('getBuildingPermissionByBuildingIdAndUserId', () => {
  it('returns permissions by building id', () => {
    const selection = getBuildingPermissionByBuildingIdAndUserId(state, 'foo', '1');

    expect(selection).toMatchObject(state.buildings.entities.permissions[1]);
  });
});
