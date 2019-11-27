import { getAuthToken } from '../selectors/user';
import { ENDPOINTS } from '../constants';

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
    .then((res) => res.json());
  // TODO: Add file to redux db
};
