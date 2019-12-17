import { fetchBase, fetchWithAuth } from '../helpers';

jest.mock('../../selectors/user', () => ({
  getAuthToken: jest.fn().mockReturnValue('token'),
}));

beforeEach(() => {
  fetch.resetMocks();
});

describe('fetchBase', () => {
  it('throw an error when response has status 401', () => {
    expect.assertions(1);
    fetch.once(null, { status: 401 });

    fetchBase('foo', {}).catch((err) => {
      expect(err.message).toBe('401');
    });
  });

  it('throw an error when response has status 404', () => {
    expect.assertions(1);
    fetch.once(null, { status: 404 });

    fetchBase('foo', {}).catch((err) => {
      expect(err.message).toBe('404');
    });
  });

  it('throw an error when response has status 500', () => {
    expect.assertions(1);
    fetch.once(null, { status: 500 });

    fetchBase('foo', {}).catch((err) => {
      expect(err.message).toBe('500');
    });
  });

  it('returns a response', () => {
    fetch.once('foo');

    fetchBase('foo', {}).then((response) => {
      expect(response.body).toBe('foo');
    });
  });
});

describe('fetchWithAuth', () => {
  it('calls fetch with Authorization header', () => {
    fetch.once('foo');

    const options = {
      body: 'body',
      contentType: 'abc',
      headers: {
        foo: 'bar',
      },
      method: 'POST',
      url: 'foo',
    };
    const dispatch = () => {};
    const getState = () => {};

    fetchWithAuth(options)(dispatch, getState);

    expect(fetch.mock.calls[0]).toEqual([
      'foo',
      {
        body: 'body',
        headers: {
          Authorization: 'Bearer token',
          'Content-Type': 'abc',
          foo: 'bar',
        },
        method: 'POST',
      },
    ]);
  });
});
