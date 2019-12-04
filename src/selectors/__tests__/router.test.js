import {
  getPathname,
  getQuery,
  getSearch,
} from '../router';

let state;
beforeEach(() => {
  state = {
    router: {
      location: {},
    },
  };
});

describe('getPathname', () => {
  it('returns pathname', () => {
    state.router.location.pathname = 'foo';

    const selection = getPathname(state);

    expect(selection).toBe('foo');
  });
});

describe('getSearch', () => {
  it('returns pathname', () => {
    state.router.location.search = 'foo';

    const selection = getSearch(state);

    expect(selection).toBe('foo');
  });
});

describe('getQuery', () => {
  it('returns query', () => {
    const query = {
      a: 'b',
      foo: 'bar',
    };
    state.router.location.query = query;

    const selection = getQuery(state);

    expect(selection).toBe(query);
  });
});
