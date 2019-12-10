const routes = {
  building: {
    edit: (id = ':buildingId') => `/${id}/edit`,
    main: (id = ':buildingId') => `/${id}`,
  },
  forgotPassword: () => '/forgot-password',
  home: () => '/',
  profile: () => '/profile',
  signIn: () => '/signin',
  signUp: () => '/signup',
};

export default routes;
