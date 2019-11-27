import { SET_MESSAGE } from './types';

export const setMessage = (message) => ({
  payload: message,
  type: SET_MESSAGE,
});
