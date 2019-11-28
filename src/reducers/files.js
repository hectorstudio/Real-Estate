import update from 'immutability-helper';
import { normalize } from 'normalizr';

import initialState from '../initialState';
import { RECEIVE_FILES, RECEIVE_POST_FILE } from '../actions/types';
import { fileSchema } from '../schemas';

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
    default:
      return state;
  }
};
