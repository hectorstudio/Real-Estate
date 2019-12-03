import { ADD_FILE_UPLOAD, DELETE_FILE_UPLOAD, UPDATE_FILE_UPLOAD } from './types';
import { WINDOW_UPLOADS_KEY } from '../constants';

export const addNewUpload = (fileId, size, uploadInstance) => (dispatch) => {
  window[WINDOW_UPLOADS_KEY][fileId] = uploadInstance;

  return dispatch({
    payload: {
      id: fileId,
      size,
    },
    type: ADD_FILE_UPLOAD,
  });
};

export const deleteUpload = (fileId) => (dispatch) => dispatch({
  payload: {
    id: fileId,
  },
  type: DELETE_FILE_UPLOAD,
});

export const updateUpload = (fileId, uploaded) => (dispatch) => dispatch({
  payload: {
    id: fileId,
    uploaded,
  },
  type: UPDATE_FILE_UPLOAD,
});

export const resumeUpload = (fileId) => (dispatch) => dispatch({
  payload: {
    id: fileId,
    paused: false,
  },
  type: UPDATE_FILE_UPLOAD,
});

export const pauseUpload = (fileId) => (dispatch) => dispatch({
  payload: {
    id: fileId,
    paused: true,
  },
  type: UPDATE_FILE_UPLOAD,
});
