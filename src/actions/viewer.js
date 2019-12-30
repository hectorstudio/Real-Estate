import { SHOW_VIEWER, HIDE_VIEWER } from './types';

export const showViewer = (fileId) => ({
  payload: {
    fileId,
  },
  type: SHOW_VIEWER,
});

export const hideViewer = () => ({
  type: HIDE_VIEWER,
});
