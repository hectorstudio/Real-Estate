import { SET_USER } from '../../actions/types';
import reducer from '../user';
import initialState from '../../initialState';

it('returns state', () => {
  const state = {};

  const newState = reducer(state, {});

  expect(newState).toBe(state);
});

it('returns initial state if no state is passed', () => {
  const newState = reducer(undefined, {});

  expect(newState).toBe(initialState.user);
});

it('SET_USER sets user object in redux store', () => {
  const userObject = {
    email: 'foo',
    token: 'bar',
  };

  const newState = reducer(undefined, {
    payload: userObject,
    type: SET_USER,
  });

  expect(newState).toBe(userObject);
});
