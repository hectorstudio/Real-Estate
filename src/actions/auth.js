import { SAVE_USER } from "./types";

export const saveUser = (user, token) => ({
  type: SAVE_USER,
  payload: {
    ...user,
    token,
  },
});
