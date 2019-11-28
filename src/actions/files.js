import { getAuthToken } from '../selectors/user';
import { ENDPOINTS } from '../constants';
import { RECEIVE_FILES, RECEIVE_POST_FILE } from './types';

export const fetchFiles = () => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  return fetch(ENDPOINTS.files.many(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'GET',
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        payload: data,
        type: RECEIVE_FILES,
      });
    });
};

export const addNewFile = (name) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  return fetch(ENDPOINTS.files.many(), {
    body: JSON.stringify({ name }),
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        payload: data.file,
        type: RECEIVE_POST_FILE,
      });
      return data;
    });
};
