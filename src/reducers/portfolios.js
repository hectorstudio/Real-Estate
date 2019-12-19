import { normalize } from 'normalizr';

import initialState from '../initialState';
import { portfolioSchema } from '../schemas';
import { RECEIVE_GET_PORTFOLIOS } from '../actions/types';

export default (state = initialState.portfolios, action) => {
  switch (action.type) {
    case RECEIVE_GET_PORTFOLIOS:
      return normalize(action.payload, [portfolioSchema]);
    default:
      return state;
  }
};
