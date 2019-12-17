import { saveUser, setIdToken } from '../auth';
import { SET_USER, SET_ID_TOKEN } from '../types';

jest.mock('../../helpers', () => ({
  cleanUserObject: (x) => x,
}));

describe('saveUser', () => {
  it('returns redux action with user object and auth token as payload', () => {
    const token = 'foo';
    const user = {
      email: 'bar',
    };

    const action = saveUser(user, token);

    expect(action).toEqual({
      payload: {
        ...user,
        token,
      },
      type: SET_USER,
    });
  });
});

describe('setIdToken', () => {
  it('returns action with token as payload', () => {
    const token = 'foo';

    const action = setIdToken(token);

    expect(action).toEqual({
      payload: token,
      type: SET_ID_TOKEN,
    });
  });
});
