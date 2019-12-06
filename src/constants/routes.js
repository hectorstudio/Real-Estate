const routes = {
  building: (id = ':buildingId') => `/${id}`,
  forgotPassword: () => '/forgot-password',
  home: () => '/',
  profile: () => '/profile',
  signIn: () => '/signin',
  signUp: () => '/signup',
};

export default routes;
