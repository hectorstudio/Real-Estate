import { SET_USER, SET_ID_TOKEN } from '../../actions/types';
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

describe('SET_USER', () => {
  it('sets user object in redux store', () => {
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
});

describe('SET_ID_TOKEN', () => {
  it('saves token in the state', () => {
    const newState = reducer(undefined, {
      payload: 'token',
      type: SET_ID_TOKEN,
    });

    expect(newState).toEqual({
      idToken: 'token',
    });
  });
});
