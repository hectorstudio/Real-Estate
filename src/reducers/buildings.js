import update from 'immutability-helper';
import { normalize } from 'normalizr';

import initialState from '../initialState';
import { buildingSchema } from '../schemas';
import {
  RECEIVE_GET_BUILDINGS,
  RECEIVE_POST_BUILDING,
} from '../actions/types';

export default (state = initialState.files, action) => {
  switch (action.type) {
    case RECEIVE_GET_BUILDINGS:
      return normalize(action.payload, [buildingSchema]);
    case RECEIVE_POST_BUILDING:
      if (!state.entities.buildings) {
        return normalize([action.payload], [buildingSchema]);
      }

      return update(state, {
        entities: {
          buildings: {
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
