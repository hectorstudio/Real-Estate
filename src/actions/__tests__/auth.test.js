import { saveUser } from '../auth';
import { SET_USER } from '../types';

jest.mock('../../helpers', () => ({
  cleanUserObject: (x) => x,
}));

describe('saveUser', () => {
  it('return redux action with user object and auth token as payload', () => {
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
