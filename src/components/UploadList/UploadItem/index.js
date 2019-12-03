import React from 'react';
import PropTypes from 'prop-types';
import fileSize from 'filesize';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  LinearProgress,
} from '@material-ui/core';
import {
  Clear,
  Pause,
  PlayArrow,
} from '@material-ui/icons';

import { WINDOW_UPLOADS_KEY } from '../../../constants';
import { deleteFile } from '../../../actions/files';
import { getFileById } from '../../../selectors/files';
import { resumeUpload, pauseUpload, deleteUpload } from '../../../actions/uploads';

import s from './index.module.scss';

function UploadItem(props) {
  const dispatch = useDispatch();
  const file = useSelector((state) => getFileById(state, props.upload.id));

  const uploadInstance = window[WINDOW_UPLOADS_KEY][props.upload.id];
  if (!uploadInstance) {
    return null;
  }

  const {
    size = 9999,
    uploaded = 0,
  } = props.upload;

  const remainingFileSize = fileSize(size - uploaded);
  const progressPercentage = Math.floor((uploaded / size) * 100);

  const resume = () => {
    dispatch(resumeUpload(file.id));
    uploadInstance.unpause();
  };

  const pause = () => {
    dispatch(pauseUpload(file.id));
    uploadInstance.pause();
  };

  const onDelete = () => {
    dispatch(deleteFile(file.id));
    dispatch(deleteUpload(file.id));
  };

  return (
    <ListItem className={s.item}>
      <ListItemText>
        {file.name}
        <LinearProgress
          className={s.progress}
          value={progressPercentage}
          variant="determinate"
        />
        <Typography color="textSecondary" variant="caption">
          {`${progressPercentage}% uploaded (${remainingFileSize} remaining)`}
        </Typography>
      </ListItemText>
      <ListItemSecondaryAction className={s.itemActions}>
        {props.upload.paused
          ? (
            <IconButton
              color="primary"
              onClick={resume}
              size="small"
            >
              <PlayArrow />
            </IconButton>
          )
          : (
            <IconButton onClick={pause} size="small">
              <Pause />
            </IconButton>
          )}
        <IconButton onClick={onDelete} size="small">
          <Clear />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

UploadItem.propTypes = {
  upload: PropTypes.shape().isRequired,
};

export default UploadItem;
