import { getBuildings, getBuildingById } from '../buildings';

let state;
beforeEach(() => {
  state = {
    buildings: {
      entities: {
        buildings: {
          1: { id: '1', name: 'foo' },
          2: { id: '2', name: 'bar' },
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
