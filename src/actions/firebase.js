import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';

import { firebaseConfig } from '../constants';

export const initFirebase = () => {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
};

export const createUserWithEmailAndPassword = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password);

export const onAuthStateChanged = (callback) => firebase.auth().onAuthStateChanged(callback);

export const signInWithEmailAndPassword = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

export const signOut = () => firebase.auth().signOut();
