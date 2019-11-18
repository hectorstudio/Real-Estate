import { SAVE_USER } from "./types";
import { cleanUserObject } from "../helpers";

export const saveUser = (user, token) => ({
  type: SAVE_USER,
  payload: {
    ...cleanUserObject(user),
    token,
  },
});
