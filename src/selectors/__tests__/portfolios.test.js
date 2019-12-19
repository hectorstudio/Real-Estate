import {
  getPortfolioById,
  getPortfolioPermissionByPortfolioIdAndUserId,
  getPortfolioPermissions,
  getPortfolioPermissionsByPortfolioId,
  getPortfolios,
} from '../portfolios';

let state;
beforeEach(() => {
  state = {
    portfolios: {
      entities: {
        permissions: {
          1: {
            contentId: 'foo',
            id: '1',
            role: 'foo',
            type: 'portfolios',
            userId: '1',
          },
          2: {
            contentId: 'bar',
            id: '2',
            role: 'foo',
            type: 'portfolios',
            userId: '1',
          },
        },
        portfolios: {
          1: { id: '1', name: 'foo' },
          2: { id: '2', name: 'bar' },
        },
      },
      result: ['1', '2'],
    },
  };
});

describe('getPortfolios', () => {
  it('returns list of portfolios', () => {
    const selection = getPortfolios(state);

    expect(selection).toMatchObject([
      state.portfolios.entities.portfolios[1],
      state.portfolios.entities.portfolios[2],
    ]);
  });
});

describe('getPortfolioById', () => {
  it('returns portfolios by id', () => {
    const selection = getPortfolioById(state, '1');

    expect(selection).toMatchObject(state.portfolios.entities.portfolios[1]);
  });
});

describe('getPortfolioPermissions', () => {
  it('returns empty array if there are no permissons', () => {
    state.portfolios.entities.permissions = undefined;
    const selection = getPortfolioPermissions(state);

    expect(selection).toMatchObject([]);
  });

  it('returns list of permissions', () => {
    const { permissions } = state.portfolios.entities;

    const selection = getPortfolioPermissions(state);

    expect(selection).toMatchObject([permissions[1], permissions[2]]);
  });
});

describe('getPortfolioPermissionsByPortfolioId', () => {
  it('returns permissions by portfolio id', () => {
    const selection = getPortfolioPermissionsByPortfolioId(state, 'foo');

    expect(selection).toMatchObject([state.portfolios.entities.permissions[1]]);
  });
});

describe('getPortfolioPermissionByPortfolioIdAndUserId', () => {
  it('returns permissions by portfolio id', () => {
    const selection = getPortfolioPermissionByPortfolioIdAndUserId(state, 'foo', '1');

    expect(selection).toMatchObject(state.portfolios.entities.permissions[1]);
  });
});
