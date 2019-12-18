/* istanbul ignore next */
const routes = {
  building: {
    edit: (id = ':buildingId') => `/${id}/edit`,
    files: (id = ':buildingId') => `/${id}/files`,
    main: (id = ':buildingId') => `/${id}`,
    share: (id = ':buildingId') => `/${id}/share`,
  },
  forgotPassword: () => '/forgot-password',
  home: () => '/',
  profile: {
    main: () => '/profile',
    security: () => '/profile/security',
  },
  signIn: () => '/signin',
  signUp: () => '/signup',
};

export default routes;
