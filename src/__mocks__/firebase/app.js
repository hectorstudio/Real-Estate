const auth = jest.fn().mockImplementation(function auth() {
  let authStateChangedCallback;
  this.onAuthStateChanged = jest.fn().mockImplementation((cb) => {
    authStateChangedCallback = cb;
    return this.unregisterAuthObserver;
  });
  this.currentUser = {
    getIdToken: jest.fn().mockResolvedValue('token'),
  };
  // this.fetchSignInMethodsForEmail = jest.fn().mockResolvedValue([]);
  // this.getRedirectResult = jest.fn().mockResolvedValue();
  // this.isSignInWithEmailLink = jest.fn((arg = true) => !!arg);
  // this.sendSignInLinkToEmail = jest.fn().mockResolvedValue();
  // this.setPersistence = jest.fn().mockResolvedValue();
  this.signInWithEmailAndPassword = jest.fn().mockResolvedValue();
  // this.signInWithRedirect = jest.fn();
  this.signOut = jest.fn().mockResolvedValue();
  // this.triggerAuthStateChanged = (user) => authStateChangedCallback(user);
  // this.unregisterAuthObserver = jest.fn();
  // this.signInAnonymously = jest.fn().mockResolvedValue({ user: this.currentUser });

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
