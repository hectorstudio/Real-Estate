import { getAuthToken } from '../selectors/user';
import { ENDPOINTS } from '../constants';
import { RECEIVE_FILES, RECEIVE_POST_FILE, DELETE_FILES } from './types';

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

export const addNewFile = (name, size) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  return fetch(ENDPOINTS.files.many(), {
    body: JSON.stringify({ name, size }),
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

export const getDownloadLink = (fileId) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  return fetch(ENDPOINTS.files.download(fileId), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'GET',
  })
    .then((res) => res.json());
};

export const deleteFiles = (ids) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  return fetch(ENDPOINTS.files.many(), {
    body: JSON.stringify(ids),
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  })
    .then((res) => res.json())
    .then(() => dispatch({
      payload: {
        ids,
      },
      type: DELETE_FILES,
    }));
};
