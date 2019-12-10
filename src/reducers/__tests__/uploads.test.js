import {
  ADD_FILE_UPLOAD, DELETE_FILE_UPLOAD, UPDATE_FILE_UPLOAD,
} from '../../actions/types';
import reducer from '../uploads';
import initialState from '../../initialState';

let state;
beforeEach(() => {
  state = initialState.uploads;
});

it('returns state', () => {
  state = {};

  const newState = reducer(state, {});

  expect(newState).toBe(state);
});

it('returns initial state if no state is passed', () => {
  const newState = reducer(undefined, {});

  expect(newState).toBe(initialState.uploads);
});

describe('ADD_FILE_UPLOAD', () => {
  it('adds an upload to an empty state', () => {
    const action = {
      payload: { id: '1', name: 'foo' },
      type: ADD_FILE_UPLOAD,
    };

    const newState = reducer(state, action);

    expect(newState).toEqual({
      entities: {
        uploads: {
          1: {
            ...action.payload,
          },
        },
      },
      result: ['1'],
    });
  });

  it('adds an upload to the state', () => {
    state = {
      entities: {
        uploads: {
          1: { id: '1', name: 'foo' },
        },
      },
      result: ['1'],
    };

    const action = {
      payload: { id: '2', name: 'bar' },
      type: ADD_FILE_UPLOAD,
    };

    const newState = reducer(state, action);

    expect(newState).toEqual({
      entities: {
        uploads: {
          ...state.entities.uploads,
          2: {
            ...action.payload,
            paused: false,
            uploaded: 0,
          },
        },
      },
      result: ['1', '2'],
    });
  });
});

describe('DELETE_FILE_UPLOAD', () => {
  it('removes an entry from the state', () => {
    state = {
      entities: {
        uploads: {
          0: 'foo',
          1: 'bar',
          2: 'baz',
        },
      },
      result: ['0', '1', '2'],
    };

    const newState = reducer(state, {
      payload: { id: '1' },
      type: DELETE_FILE_UPLOAD,
    });

    expect(newState).toMatchObject({
      entities: {
        uploads: {
          0: 'foo',
          2: 'baz',
        },
      },
      result: ['0', '2'],
    });
  });
});

describe('UPDATE_FILE_UPLOAD', () => {
  it('removes an entry from the state', () => {
    state = {
      entities: {
        uploads: {
          0: { id: '0', name: 'foo' },
          1: { id: '1', name: 'bar' },
        },
      },
      result: ['0', '1'],
    };

    const newState = reducer(state, {
      payload: { id: '1', name: 'baz' },
      type: UPDATE_FILE_UPLOAD,
    });

    expect(newState).toMatchObject({
      entities: {
        uploads: {
          ...state.entities.uploads,
          1: {
            id: '1',
            name: 'baz',
          },
        },
      },
      result: ['0', '1'],
    });
  });
});
