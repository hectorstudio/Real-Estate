import { ENDPOINTS } from '../constants';
import { RECEIVE_GET_PORTFOLIOS } from './types';
import { fetchWithAuth } from './helpers';

export const fetchPortfolios = () => (dispatch) => {
  const url = ENDPOINTS.portfolios.many();

  return dispatch(fetchWithAuth({
    url,
  }))
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        payload: data,
        type: RECEIVE_GET_PORTFOLIOS,
      });
    });
};
