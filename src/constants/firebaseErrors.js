export const invalidEmail = 'auth/invalid-email';
export const userNotFound = 'auth/user-not-found';
export const wrongPassword = 'auth/wrong-password';

export default {
  [invalidEmail]: 'Email address is invalid.', // Not valid format of email address
  [userNotFound]: 'Invalid email address or password', // No user found with that email address
  [wrongPassword]: 'The password is invalid.', // Reauthenticate password is wrong
};

// TODO:
// https://firebase.google.com/docs/reference/js/firebase.auth.Auth.html#applyactioncode
export const expiredActionCode = 'auth/expired-action-code';
export const invalidActionCode = 'auth/invalid-action-code';
export const userDisabled = 'auth/user-disabled';

export const tooManyRequests = 'auth/too-many-requests';
