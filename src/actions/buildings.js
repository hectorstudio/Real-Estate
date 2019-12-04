import { ENDPOINTS } from '../constants';
import { getAuthToken } from '../selectors/user';
import {
  RECEIVE_GET_BUILDINGS,
} from './types';

export const addNewBuilding = (userData) => fetch(ENDPOINTS.buildings.many(), {
  body: JSON.stringify(userData),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  method: 'POST',
})
  .then((res) => res.json())
  .then((data) => data);
  // TODO: Dispatch RECEIVE_POST_BUILDING action

export const fetchBuildings = () => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  return fetch(ENDPOINTS.buildings.many(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'GET',
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        payload: data,
        type: RECEIVE_GET_BUILDINGS,
      });
    });
};
