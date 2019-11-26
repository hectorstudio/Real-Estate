import firebaseErrors from '../constants/firebaseErrors';

// ISO 3166-1 alpha-2
// ⚠️ No support for IE 11
export const countryToFlag = (isoCode) => (typeof String.fromCodePoint !== 'undefined'
  ? isoCode.toUpperCase().replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
  : isoCode);

export const getFirebaseErrorMessage = (error) => firebaseErrors[error.code] || error.message;
