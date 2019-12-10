import { SET_MESSAGE } from '../../actions/types';
import reducer from '../message';
import initialState from '../../initialState';

let state;
beforeEach(() => {
  state = initialState.message;
});

it('returns state', () => {
  state = {};

  const newState = reducer(state, {});

  expect(newState).toBe(state);
});

it('returns initial state if no state is passed', () => {
  const newState = reducer(undefined, {});

  expect(newState).toBe(initialState.message);
});

describe('SET_MESSAGE', () => {
  it('updates state with message from payload', () => {
    const action = {
      payload: 'foo',
      type: SET_MESSAGE,
    };

    const newState = reducer(state, action);

    expect(newState).toEqual('foo');
  });

  it('updates state with null if there is no message', () => {
    const action = {
      type: SET_MESSAGE,
    };

    const newState = reducer(state, action);

    expect(newState).toBeNull();
  });
});
