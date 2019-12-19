import reducer from '../portfolios';
import initialState from '../../initialState';
import { RECEIVE_GET_PORTFOLIOS } from '../../actions/types';

let state;
beforeEach(() => {
  state = initialState.portfolios;
});

it('returns state', () => {
  state = {};

  const newState = reducer(state, {});

  expect(newState).toBe(state);
});

it('returns initial state if no state is passed', () => {
  const newState = reducer(undefined, {});

  expect(newState).toBe(initialState.portfolios);
});

describe('RECEIVE_GET_PORTFOLIOS', () => {
  it('loads data into state', () => {
    const action = {
      payload: [{ id: '1', name: 'foo' }],
      type: RECEIVE_GET_PORTFOLIOS,
    };

    const newState = reducer(state, action);

    expect(newState).toStrictEqual({
      entities: {
        portfolios: {
          1: action.payload[0],
        },
      },
      result: ['1'],
    });
  });
});
