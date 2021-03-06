const API_URL = process.env.REACT_APP_API_URL;

/* istanbul ignore next */
export default {
  buildings: {
    cover: (buildingId) => `${API_URL}buildings/${buildingId}/cover`,
    many: () => `${API_URL}buildings`,
    one: (buildingId) => `${API_URL}buildings/${buildingId}`,
    permissions: (buildingId) => `${API_URL}buildings/${buildingId}/permissions`,
  },
  files: {
    buildingId: (buildingId) => `${API_URL}files/${buildingId}`,
    download: (fileId) => `${API_URL}files/download/${fileId}`,
    many: () => `${API_URL}files`,
    one: (fileId) => `${API_URL}files/${fileId}`,
    success: (fileId) => `${API_URL}files/success/${fileId}`,
    upload: (fileId) => `${API_URL}files/upload/${fileId}`,
  },
  portfolios: {
    many: () => `${API_URL}portfolios`,
    one: (portfolioId) => `${API_URL}portfolios/${portfolioId}`,
    permissions: (portfolioId) => `${API_URL}portfolios/${portfolioId}/permissions`,
  },
  users: {
    currentUser: () => `${API_URL}users/currentUser`,
    firebaseId: (firebaseId) => `${API_URL}users/firebase/${firebaseId}`,
    many: () => `${API_URL}users/`,
    one: (userId) => `${API_URL}users/${userId}`,
    photo: () => `${API_URL}users/photo`,
    verify: () => `${API_URL}users/verify`,
  },
};
