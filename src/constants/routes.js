const routes = {
  building: {
    edit: (id = ':buildingId') => `/${id}/edit`,
    files: (id = ':buildingId') => `/${id}/files`,
    main: (id = ':buildingId') => `/${id}`,
  },
  forgotPassword: () => '/forgot-password',
  home: () => '/',
  profile: () => '/profile',
  signIn: () => '/signin',
  signUp: () => '/signup',
};

export default routes;
