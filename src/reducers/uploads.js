import update from 'immutability-helper';
import initialState from '../initialState';
import { ADD_FILE_UPLOAD, DELETE_FILE_UPLOAD, UPDATE_FILE_UPLOAD } from '../actions/types';

export default (state = initialState.uploads, action) => {
  switch (action.type) {
    case ADD_FILE_UPLOAD:
      return update(state, {
        [action.payload.id]: {
          $set: {
            ...action.payload,
            uploaded: 0,
          },
        },
      });
    case DELETE_FILE_UPLOAD:
      return update(state, {
        $unset: [action.payload.id],
      });
    case UPDATE_FILE_UPLOAD:
      return update(state, {
        [action.payload.id]: {
          uploaded: {
            $set: action.payload.uploaded,
          },
        },
      });
    default:
      return state;
  }
};
