const API_URL = process.env.REACT_APP_API_URL;

export default {
  users: {
    currentUser: () => `${API_URL}users/currentUser`,
    firebaseId: (firebaseId) => `${API_URL}users/firebase/${firebaseId}`,
    many: () => `${API_URL}users/`,
    one: (userId) => `${API_URL}users/${userId}`,
    verify: (userId) => `${API_URL}users/${userId}/verify`,
  },
};
