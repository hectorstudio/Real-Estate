import { createSelector } from 'reselect';

export const getPathname = (state) => state.router.location.pathname;

export const getSearch = (state) => state.router.location.search;

export const getQuery = (state) => state.router.location.query;

export const getCurrentBuildingId = createSelector(
  getPathname,
  (pathname) => {
    // /:buildingId
    const match = pathname.match(/^\/([a-zA-Z\d-]+)/);
    if (match && match.length > 1) {
      return match[1];
    }
    return null;
  },
);
