import { getAuthToken, getCurrentUser } from '../user';

let state;
beforeEach(() => {
  state = {
    user: {},
  };
});

describe('getAuthToken', () => {
  it('returns auth token', () => {
    state.user.token = 'token';

    const selection = getAuthToken(state);

    expect(selection).toBe('token');
  });
});

describe('getSearch', () => {
  it('returns pathname', () => {
    const user = {
      email: 'foo',
      token: 'bar',
    };

    state.user = user;

    const selection = getCurrentUser(state);

    expect(selection).toBe(user);
  });
});
