import { SHOW_VIEWER, HIDE_VIEWER } from '../actions/types';
import initialState from '../initialState';

export default (state = initialState.viewer, action) => {
  switch (action.type) {
    case HIDE_VIEWER:
      return {
        fileId: null,
        visible: false,
      };
    case SHOW_VIEWER:
      return {
        fileId: action.payload.fileId,
        visible: true,
      };
    default:
      return state;
  }
};
