import { createSelector } from 'reselect';

const getPortfolioEntities = (state) => state.portfolios.entities.portfolios;
const getPortfolioPermissionEntities = (state) => state.portfolios.entities.permissions;
const getPortfolioIds = (state) => state.portfolios.result;

export const getPortfolios = createSelector(
  getPortfolioIds,
  getPortfolioEntities,
  (ids, entities) => ids.map((id) => entities[id]),
);

export const getPortfolioById = createSelector(
  getPortfolios,
  (state, id) => id,
  (portfolios, id) => portfolios.find((portfolio) => portfolio.id === id),
);

export const getPortfolioPermissions = createSelector(
  getPortfolioPermissionEntities,
  (entities) => (entities ? Object.values(entities) : []),
);

export const getPortfolioPermissionsByPortfolioId = createSelector(
  getPortfolioPermissions,
  (state, id) => id,
  (portfolioPermissions, id) => portfolioPermissions.filter((x) => x.contentId === id),
);

export const getPortfolioPermissionByPortfolioIdAndUserId = createSelector(
  getPortfolioPermissions,
  (state, portfolioId) => portfolioId,
  (state, portfolioId, userId) => userId,
  (portfolioPermissions, portfolioId, userId) => portfolioPermissions.find((x) => x.contentId === portfolioId && x.userId === userId),
);
