import reducer from '../buildings';
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
