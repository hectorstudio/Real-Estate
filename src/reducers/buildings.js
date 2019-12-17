import update from 'immutability-helper';
import { normalize } from 'normalizr';

import initialState from '../initialState';
import { buildingSchema } from '../schemas';
import {
  RECEIVE_DELETE_BUILDING_PERMISSION,
  RECEIVE_GET_BUILDINGS,
  RECEIVE_PATCH_BUILDING,
  RECEIVE_PATCH_BUILDING_PERMISSION,
  RECEIVE_POST_BUILDING,
  RECEIVE_POST_BUILDING_PERMISSION,
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
    case RECEIVE_PATCH_BUILDING:
      return update(state, {
        entities: {
          buildings: {
            [action.payload.id]: {
              $set: action.payload,
            },
          },
        },
      });
    case RECEIVE_PATCH_BUILDING_PERMISSION:
      return update(state, {
        entities: {
          permissions: {
            [action.payload.id]: {
              role: {
                $set: action.payload.role,
              },
            },
          },
        },
      });
    case RECEIVE_POST_BUILDING_PERMISSION:
      return update(state, {
        entities: {
          permissions: {
            [action.payload.id]: {
              $set: action.payload,
            },
          },
        },
      });
    case RECEIVE_DELETE_BUILDING_PERMISSION:
      return update(state, {
        entities: {
          permissions: {
            $unset: [action.payload.id],
          },
        },
      });
    default:
      return state;
  }
};
