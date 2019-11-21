import { ENDPOINTS } from '../constants';
import { getAuthToken } from '../selectors/user';
import { saveUser } from './auth';

export const addNewUser = (userData) => fetch(ENDPOINTS.users.many(), {
  body: JSON.stringify(userData),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  method: 'POST',
})
  .then((res) => res.json())
  .then((data) => data);

export const getUserByFirebaseId = (firebaseId) => fetch(ENDPOINTS.users.firebaseId(firebaseId), {
  method: 'GET',
})
  .then((res) => res.json())
  .then((data) => data.length && data[0]);

export const fetchCurrentUser = (idToken) => (dispatch, getState) => {
  const state = getState();
  const token = idToken || getAuthToken(state);

  return fetch(ENDPOINTS.users.currentUser(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'GET',
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch(saveUser(data[0], token));
    });
};
