import { getUsers } from '../users';

let state;
beforeEach(() => {
  state = {
    users: {
      entities: {
        users: {
          1: { name: 'foo' },
          2: { name: 'bar' },
        },
      },
      result: ['1', '2'],
    },
  };
});

describe('getUsers', () => {
  it('returns auth token', () => {
    const selection = getUsers(state);

    expect(selection).toMatchObject([
      state.users.entities.users[1],
      state.users.entities.users[2],
    ]);
  });
});
