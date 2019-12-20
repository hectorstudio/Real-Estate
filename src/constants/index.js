export { default as ENDPOINTS } from './endpoints';
export { default as ROUTES } from './routes';

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
};

export const authActionModes = {
  resetPassword: 'resetPassword',
  verifyEmail: 'verifyEmail',
};

export const FILE_STATUS = {
  DELETED: 'DELETED',
  PREVIEW: 'PREVIEW_GENERATION',
  PROCESSING: 'PROCESSING',
  READY: 'READY',
  UPLOADING: 'UPLOADING',
};

// Key name for storing uploads under window object (window.[WINDOW_UPLOADS_KEY])
export const WINDOW_UPLOADS_KEY = '_pbUploads';
// Key name for storing resumable upload urls in local storage (Add underscore and id, example: {key}_{id})
export const WINDOW_UPLOAD_URLS_KEY = '_pbResumableUploadUrl';

export const UPLOAD_CONFIG = {
  chunkSize: 262144 * 40, // ~10MB
  resumable: true,
  storage: window.localStorage,
  uploadUrlExpiry: Date.now() + 1000 * 60 * 60 * 24 * 7, // One week
};

// Permissions
export const ROLES = {
  ADMIN: 'ADMIN',
  CONTRIBUTOR: 'CONTRIBUTOR',
  EDITOR: 'EDITOR',
  VIEWER: 'VIEWER',
};
export const CONTENT_TYPES = {
  buildings: 'buildings',
  files: 'files',
  portfolios: 'portfolios',
};

// Fetch will throw an error when receiving a response with one of the status codes
export const FETCH_RESPONSE_STATUS_THROW = [
  401,
  404,
  500,
];

export const MAX_IMAGE_COVER_SIZE = 2 * 1024 * 1024; // 2 MB
export const MAX_USER_PHOTO_SIZE = 2 * 1024 * 1024; // 2 MB
