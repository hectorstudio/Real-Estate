const auth = jest.fn().mockImplementation(function auth() {
  this.onAuthStateChanged = jest.fn().mockImplementation(() => this.unregisterAuthObserver);
  this.currentUser = {
    getIdToken: jest.fn().mockResolvedValue('token'),
  };
  this.sendPasswordResetEmail = jest.fn().mockResolvedValue();
  this.createUserWithEmailAndPassword = jest.fn().mockResolvedValue();
  this.signInWithPhoneNumber = jest.fn().mockResolvedValue();
  this.signInWithEmailAndPassword = jest.fn().mockResolvedValue();
  this.signOut = jest.fn().mockResolvedValue();

  return this;
});

const initializeApp = jest.fn();
const analytics = jest.fn();

export const provider = {
  addScope: jest.fn(),
};

auth.GoogleAuthProvider = jest.fn().mockImplementation(() => provider);
auth.OAuthProvider = jest.fn().mockImplementation(() => provider);

export default {
  analytics,
  auth,
  initializeApp,
};
