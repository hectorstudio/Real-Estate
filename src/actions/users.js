import { ENDPOINTS } from '../constants';
import { getAuthToken } from '../selectors/user';
import { saveUser } from './auth';
import { RECEIVE_USERS } from './types';
import { fetchWithAuth } from './helpers';

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

export const fetchUsers = () => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  return fetch(ENDPOINTS.users.many(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'GET',
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        payload: data,
        type: RECEIVE_USERS,
      });
    });
};

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
    companyName: values.companyName,
    country: values.country,
    firstName: values.firstName,
    jobTitle: values.jobTitle,
    lastName: values.lastName,
    phone: values.phone,
    photoUrl: values.photoUrl,
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

export const verifyEmail = () => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  return fetch(ENDPOINTS.users.verify(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'PATCH',
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch(saveUser(data, token));
    });
};

export const uploadUserPhotoImage = (file) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);
  const url = ENDPOINTS.users.photo();

  const formData = new FormData();
  formData.append('file', file);

  return dispatch(fetchWithAuth({
    body: formData,
    method: 'POST',
    skipContentType: true,
    url,
  }))
    .then((res) => res.json())
    .then((data) => {
      // TODO: Token is not needed here - should be removed
      dispatch(saveUser(data, token));
    });
};

export const deleteUserPhotoImage = () => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);
  const url = ENDPOINTS.users.photo();

  return dispatch(fetchWithAuth({
    method: 'DELETE',
    url,
  }))
    .then((res) => res.json())
    .then((data) => {
      // TODO: Token is not needed here - should be removed
      dispatch(saveUser(data, token));
    });
};
