import GcsBrowserUploadStream from 'gcs-browser-upload-stream';

import firebaseErrors from '../constants/firebaseErrors';
import { UPLOAD_CONFIG, WINDOW_UPLOAD_URLS_KEY } from '../constants';

// ISO 3166-1 alpha-2
// ⚠️ No support for IE 11
export const countryToFlag = (isoCode) => (typeof String.fromCodePoint !== 'undefined'
  ? isoCode.toUpperCase().replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
  : isoCode);

export const getFirebaseErrorMessage = (error) => firebaseErrors[error.code] || error.message;

export const getFileFormat = (fileName = '') => {
  const arr = fileName.split('.');
  return arr.length > 1 ? arr[arr.length - 1].toLocaleUpperCase() : '';
};

export const createUploadInstance = (params, onProgress, onComplete) => {
  const uploadParams = {
    chunkSize: UPLOAD_CONFIG.chunkSize,
    onProgress: (info) => {
      onProgress(params.id, info.uploadedBytes, info.totalBytes);
      if (info.uploadedBytes === info.totalBytes) {
        onComplete(params.id);
      }
    },
    resumable: UPLOAD_CONFIG.resumable,
    storage: UPLOAD_CONFIG.storage,
    ...params,
  };
  const instance = new GcsBrowserUploadStream.Upload(uploadParams);
  return instance;
};

export const getGcsLocalStorageItemKey = (id) => `__gcsBrowserUpload.${id}`;

export const getUploadUrlStorageItemKey = (id) => `${WINDOW_UPLOAD_URLS_KEY}_${id}`;
