import {
  DELETE_FILES,
  RECEIVE_FILES,
  RECEIVE_POST_FILE,
  RECEIVE_PATCH_FILE,
} from '../../actions/types';
import reducer from '../files';
import initialState from '../../initialState';

let state;
beforeEach(() => {
  state = initialState.files;
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

describe('RECEIVE_FILES', () => {
  it('loads data into state', () => {
    const action = {
      payload: [{ id: '1', name: 'foo' }],
      type: RECEIVE_FILES,
    };

    const newState = reducer(state, action);

    expect(newState).toEqual({
      entities: {
        files: {
          1: action.payload[0],
        },
      },
      result: ['1'],
    });
  });
});

describe('RECEIVE_POST_FILE', () => {
  it('adds a record to empty state', () => {
    const action = {
      payload: { id: '1', name: 'foo' },
      type: RECEIVE_POST_FILE,
    };

    const newState = reducer(state, action);

    expect(newState).toEqual({
      entities: {
        files: {
          1: action.payload,
        },
      },
      result: ['1'],
    });
  });

  it('adds a record to state', () => {
    state = {
      entities: {
        files: {
          1: { id: '1' },
        },
      },
      result: ['1'],
    };

    const action = {
      payload: { id: '2', name: 'foo' },
      type: RECEIVE_POST_FILE,
    };

    const newState = reducer(state, action);

    expect(newState).toEqual({
      entities: {
        files: {
          1: state.entities.files[1],
          2: action.payload,
        },
      },
      result: ['1', '2'],
    });
  });
});

it('DELETE_FILES removes entries from state', () => {
  state = {
    entities: {
      0: 'foo',
      1: 'bar',
      2: 'baz',
    },
    result: ['0', '1', '2'],
  };

  const newState = reducer(state, {
    payload: { ids: ['0', '2'] },
    type: DELETE_FILES,
  });

  expect(newState).toMatchObject({
    entities: {
      1: 'bar',
    },
    result: ['1'],
  });
});

describe('RECEIVE_PATCH_FILE', () => {
  it('modifies a record', () => {
    state = {
      entities: {
        files: {
          1: { id: '1' },
        },
      },
      result: ['1'],
    };

    const action = {
      payload: { id: '1', name: 'bar' },
      type: RECEIVE_PATCH_FILE,
    };

    const newState = reducer(state, action);

    expect(newState).toEqual({
      entities: {
        files: {
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
