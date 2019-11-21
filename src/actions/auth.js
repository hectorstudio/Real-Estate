import { SET_USER, SET_ID_TOKEN } from './types';

export const saveUser = (user, token) => ({
  payload: {
    ...user,
    token,
  },
  type: SET_USER,
});

export const setIdToken = (token) => ({
  payload: token,
  type: SET_ID_TOKEN,
});
