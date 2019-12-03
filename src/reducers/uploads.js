import update from 'immutability-helper';
import { normalize } from 'normalizr';

import initialState from '../initialState';
import { ADD_FILE_UPLOAD, DELETE_FILE_UPLOAD, UPDATE_FILE_UPLOAD } from '../actions/types';
import { uploadSchema } from '../schemas';

export default (state = initialState.uploads, action) => {
  switch (action.type) {
    case ADD_FILE_UPLOAD:
      if (!state.entities.uploads) {
        return normalize([action.payload], [uploadSchema]);
      }

      return update(state, {
        entities: {
          uploads: {
            [action.payload.id]: {
              $set: {
                ...action.payload,
                paused: false,
                uploaded: 0,
              },
            },
          },
        },
        result: {
          $push: [action.payload.id],
        },
      });
    case DELETE_FILE_UPLOAD:
      return update(state, {
        entities: {
          uploads: {
            $unset: [action.payload.id],
          },
        },
        result: {
          $splice: [[state.result.indexOf(action.payload.id), 1]],
        },
      });
    case UPDATE_FILE_UPLOAD:
      return update(state, {
        entities: {
          uploads: {
            [action.payload.id]: {
              $set: {
                ...state.entities.uploads[action.payload.id],
                ...action.payload,
              },
            },
          },
        },
      });
    default:
      return state;
  }
};
