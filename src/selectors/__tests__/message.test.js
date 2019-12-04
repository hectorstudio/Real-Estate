import { getMessage } from '../message';

let state;
beforeEach(() => {
  state = {};
});

describe('getMessage', () => {
  it('returns message', () => {
    state.message = 'foo';

    const selection = getMessage(state);

    expect(selection).toBe('foo');
  });
});
