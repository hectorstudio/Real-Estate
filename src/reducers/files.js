import update from 'immutability-helper';
import { normalize } from 'normalizr';

import initialState from '../initialState';
import { fileSchema } from '../schemas';
import {
  DELETE_FILES,
  RECEIVE_FILES,
  RECEIVE_PATCH_FILE,
  RECEIVE_POST_FILE,
} from '../actions/types';

export default (state = initialState.files, action) => {
  switch (action.type) {
    case RECEIVE_FILES:
      return normalize(action.payload, [fileSchema]);
    case RECEIVE_POST_FILE:
      if (!state.entities.files) {
        return normalize([action.payload], [fileSchema]);
      }

      return update(state, {
        entities: {
          files: {
            [action.payload.id]: {
              $set: action.payload,
            },
          },
        },
        result: {
          $push: [action.payload.id],
        },
      });
    case DELETE_FILES:
      return update(state, {
        entities: {
          $unset: [action.payload.ids],
        },
        result: (arr) => arr.filter((id) => action.payload.ids.indexOf(id) === -1),
      });
    case RECEIVE_PATCH_FILE:
      return update(state, {
        entities: {
          files: {
            [action.payload.id]: {
              $set: action.payload,
            },
          },
        },
      });
    default:
      return state;
  }
};
