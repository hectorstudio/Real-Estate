import reducer from '../buildings';
import initialState from '../../initialState';
import {
  RECEIVE_DELETE_BUILDING_PERMISSION,
  RECEIVE_POST_BUILDING,
  RECEIVE_GET_BUILDINGS,
  RECEIVE_PATCH_BUILDING,
  RECEIVE_POST_BUILDING_PERMISSION,
  RECEIVE_PATCH_BUILDING_PERMISSION,
} from '../../actions/types';

let state;
beforeEach(() => {
  state = initialState.buildings;
});

it('returns state', () => {
  state = {};

  const newState = reducer(state, {});

  expect(newState).toBe(state);
});

it('returns initial state if no state is passed', () => {
  const newState = reducer(undefined, {});

  expect(newState).toBe(initialState.files);
});

describe('RECEIVE_GET_BUILDINGS', () => {
  it('loads data into state', () => {
    const action = {
      payload: [{ id: '1', name: 'foo' }],
      type: RECEIVE_GET_BUILDINGS,
    };

    const newState = reducer(state, action);

    expect(newState).toEqual({
      entities: {
        buildings: {
          1: action.payload[0],
        },
      },
      result: ['1'],
    });
  });
});

describe('RECEIVE_POST_BUILDING', () => {
  it('adds a record to empty state', () => {
    const action = {
      payload: { id: '1', name: 'foo' },
      type: RECEIVE_POST_BUILDING,
    };

    const newState = reducer(state, action);

    expect(newState).toEqual({
      entities: {
        buildings: {
          1: action.payload,
        },
      },
      result: ['1'],
    });
  });

  it('adds a record to state', () => {
    state = {
      entities: {
        buildings: {
          1: { id: '1' },
        },
      },
      result: ['1'],
    };

    const action = {
      payload: { id: '2', name: 'foo' },
      type: RECEIVE_POST_BUILDING,
    };

    const newState = reducer(state, action);

    expect(newState).toEqual({
      entities: {
        buildings: {
          1: state.entities.buildings[1],
          2: action.payload,
        },
      },
      result: ['1', '2'],
    });
  });
});

describe('RECEIVE_PATCH_BUILDING', () => {
  it('modifies a record', () => {
    state = {
      entities: {
        buildings: {
          1: { id: '1' },
        },
      },
      result: ['1'],
    };

    const action = {
      payload: { id: '1', name: 'bar' },
      type: RECEIVE_PATCH_BUILDING,
    };

    const newState = reducer(state, action);

    expect(newState).toEqual({
      entities: {
        buildings: {
          1: {
            id: '1',
            name: 'bar',
          },
        },
      },
      result: ['1'],
    });
  });
});

describe('RECEIVE_PATCH_BUILDING_PERMISSION', () => {
  it('modifies role in permissions object', () => {
    state = {
      entities: {
        permissions: {
          1: { id: '1', role: 'foo' },
          2: { id: '2' },
        },
      },
    };

    const action = {
      payload: { id: '1', role: 'bar' },
      type: RECEIVE_PATCH_BUILDING_PERMISSION,
    };

    const newState = reducer(state, action);

    expect(newState).toEqual({
      entities: {
        permissions: {
          1: { id: '1', role: 'bar' },
          2: { id: '2' },
        },
      },
    });
  });
});

describe('RECEIVE_POST_BUILDING_PERMISSION', () => {
  it('adds permission object', () => {
    state = {
      entities: {
        permissions: {
          1: { id: '1' },
        },
      },
    };

    const action = {
      payload: { id: '2', role: 'foo' },
      type: RECEIVE_POST_BUILDING_PERMISSION,
    };

    const newState = reducer(state, action);

    expect(newState).toEqual({
      entities: {
        permissions: {
          1: { id: '1' },
          2: { id: '2', role: 'foo' },
        },
      },
    });
  });
});

describe('RECEIVE_DELETE_BUILDING_PERMISSION', () => {
  it('Remove permission object', () => {
    state = {
      entities: {
        permissions: {
          1: { id: '1' },
          2: { id: '2' },
        },
      },
    };

    const action = {
      payload: { id: '1' },
      type: RECEIVE_DELETE_BUILDING_PERMISSION,
    };

    const newState = reducer(state, action);

    expect(newState).toEqual({
      entities: {
        permissions: {
          2: { id: '2' },
        },
      },
    });
  });
});
