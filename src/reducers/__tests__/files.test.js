import { DELETE_FILES } from '../../actions/types';
import reducer from '../files';
import initialState from '../../initialState';

it('returns state', () => {
  const state = {};

  const newState = reducer(state, {});

  expect(newState).toBe(state);
});

it('returns initial state if no state is passed', () => {
  const newState = reducer(undefined, {});

  expect(newState).toBe(initialState.files);
});

it('DELETE_FILES removes entries from state', () => {
  const state = {
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
