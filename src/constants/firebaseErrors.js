export const invalidEmail = 'auth/invalid-email';
export const userNotFound = 'auth/user-not-found';
export const wrongPassword = 'auth/wrong-password';

export default {
  [invalidEmail]: 'Email address is invalid.', // Not valid format of email address
  [userNotFound]: 'Invalid email address or password', // No user found with that email address
  [wrongPassword]: 'The password is invalid.', // Reauthenticate password is wrong
};
