import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';

import { firebaseConfig } from '../constants';

export const initFirebase = () => {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
};

export const createUserWithEmailAndPassword = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password);

export const getCurrentUser = () => firebase.auth().currentUser;

export const signInWithPhoneNumber = (phone, recaptcha) => firebase.auth().signInWithPhoneNumber(phone, recaptcha);

export const onAuthStateChanged = (callback) => firebase.auth().onAuthStateChanged(callback);

export const sendPasswordResetEmail = (email) => firebase.auth().sendPasswordResetEmail(email);

export const signInWithEmailAndPassword = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);

export const updatePassword = (newPassword) => getCurrentUser().updatePassword(newPassword);

export const applyActionCode = (code) => firebase.auth().applyActionCode(code);

export const confirmPasswordReset = (oobCode, password) => firebase.auth().confirmPasswordReset(oobCode, password);

export const reAuthenticateWithEmailAndPassword = (email, password) => {
  const credential = firebase.auth.EmailAuthProvider.credential(
    email,
    password,
  );
  return getCurrentUser().reauthenticateWithCredential(credential);
};

export const sendEmailVerification = () => firebase.auth().currentUser.sendEmailVerification();

export const signOut = () => firebase.auth().signOut();
