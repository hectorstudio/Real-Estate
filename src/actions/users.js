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
      dispatch(saveUser(data, token));
    });
};

export const updateUser = (values) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  const formBody = {
    address: values.address,
    country: values.country,
    firstName: values.email,
    lastName: values.lastName,
    phone: values.phone,
  };

  return fetch(ENDPOINTS.users.many(), {
    body: JSON.stringify(formBody),
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch(saveUser(data, token));
    });
};
