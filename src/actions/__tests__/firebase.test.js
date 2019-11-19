import firebase from 'firebase/app';
import { initFirebase, onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from '../firebase';

describe('initFirebase', () => {
  it('calls firebase initializeApp method', () => {
    initFirebase();

    expect(firebase.initializeApp).toHaveBeenCalledWith(expect.any(Object));
  });
});

describe('onAuthStateChanged', () => {
  it('calls onAuthStateChange with callback as a first parameter', () => {
    const callback = jest.fn();

    onAuthStateChanged(callback);

    expect(firebase.auth.mock.instances[0].onAuthStateChanged).toHaveBeenCalledWith(callback);
  });
});

describe('createUserWithEmailAndPassword', () => {
  it('calls createUserWithEmailAndPassword with email and password', () => {
    createUserWithEmailAndPassword('foo', 'bar');

    expect(firebase.auth.mock.instances[0].createUserWithEmailAndPassword).toHaveBeenCalledWith('foo', 'bar');
  });
});

describe('signInWithEmailAndPassword', () => {
  it('calls signInWithEmailAndPassword with email and password', () => {
    signInWithEmailAndPassword('foo', 'bar');

    expect(firebase.auth.mock.instances[0].signInWithEmailAndPassword).toHaveBeenCalledWith('foo', 'bar');
  });
});

describe('signInWithEmailAndPassword', () => {
  it('calls signInWithEmailAndPassword with email and password', () => {
    signOut();

    expect(firebase.auth.mock.instances[0].signOut).toHaveBeenCalledWith();
  });
});
