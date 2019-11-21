import { ENDPOINTS } from "../constants";

export const addNewUser = (userData) =>
  fetch(ENDPOINTS.users.many(), {
    body: JSON.stringify(userData),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
    .then((res) => res.json())
    .then((data) => data);

export const getUserByFirebaseId = (firebaseId) =>
  fetch(ENDPOINTS.users.firebaseId(firebaseId), {
    method: 'GET',
  })
    .then((res) => res.json())
    .then((data) => data.length && data[0]);
