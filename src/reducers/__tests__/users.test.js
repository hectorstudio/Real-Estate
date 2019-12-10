import { RECEIVE_USERS } from '../../actions/types';
import reducer from '../users';
import initialState from '../../initialState';

let state;
beforeEach(() => {
  state = initialState.users;
});

it('returns state', () => {
  state = {};

  const newState = reducer(state, {});

  expect(newState).toBe(state);
});

it('returns initial state if no state is passed', () => {
  const newState = reducer(undefined, {});

  expect(newState).toBe(initialState.users);
});

describe('RECEIVE_USERS', () => {
  it('loads data into state', () => {
    const action = {
      payload: [{ id: '1', name: 'foo' }],
      type: RECEIVE_USERS,
    };

    const newState = reducer(state, action);

    expect(newState).toEqual({
      entities: {
        users: {
          1: action.payload[0],
        },
      },
      result: ['1'],
    });
  });
});
