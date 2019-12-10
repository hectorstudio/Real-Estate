import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import fileSize from 'filesize';
import { useSelector, useDispatch } from 'react-redux';
import { useDropzone } from 'react-dropzone';
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

import { WINDOW_UPLOADS_KEY, WINDOW_UPLOAD_URLS_KEY } from '../../../constants';
import { deleteFiles, markFileAsUploaded } from '../../../actions/files';
import { getFileById } from '../../../selectors/files';
import { setMessage } from '../../../actions/message';
import {
  deleteUpload,
  pauseUpload,
  resumeUpload,
  updateUpload,
  addNewUpload,
} from '../../../actions/uploads';
import { getGcsLocalStorageItemKey, createUploadInstance } from '../../../helpers';

import s from './index.module.scss';

function UploadItem(props) {
  const dispatch = useDispatch();
  const file = useSelector((state) => getFileById(state, props.upload.id));

  const {
    size = 9999,
    uploaded = 0,
  } = props.upload;

  const uploadInstance = window[WINDOW_UPLOADS_KEY][props.upload.id];

  const clearUpload = useCallback((id) => {
    dispatch(deleteUpload(id));
  }, [dispatch]);

  const onUploadProgress = useCallback((uploadId, uploadedBytes, totalBytes) => {
    dispatch(updateUpload(uploadId, uploadedBytes, totalBytes));
  }, [dispatch]);

  const onUploadComplete = useCallback((uploadId) => {
    dispatch(markFileAsUploaded(uploadId));
    clearUpload(uploadId);
    dispatch(setMessage('Upload completed'));
  }, [clearUpload, dispatch]);

  const reUpload = (files) => {
    if (!files.length) return;

    const fileToUpload = files[0];

    const gcsStorageItem = window.localStorage.getItem(getGcsLocalStorageItemKey(file.id));
    const localStorageItem = window.localStorage.getItem(`${WINDOW_UPLOAD_URLS_KEY}_${file.id}`);
    if (!gcsStorageItem || !localStorageItem) {
      setMessage('Cannot resume this upload.');
      return;
    }

    const urlObject = JSON.parse(localStorageItem);
    const { url } = urlObject;

    const params = {
      file: fileToUpload,
      id: file.id,
      url,
    };
    const newUploadInstance = createUploadInstance(params, onUploadProgress, onUploadComplete);

    newUploadInstance.start();

    dispatch(addNewUpload(file.id, file.size, newUploadInstance));
  };

  const {
    getRootProps,
    getInputProps,
  } = useDropzone({
    noDrag: true,
    onDrop: reUpload,
  });

  const resume = () => {
    if (!uploadInstance) {
      reUpload();
      return;
    }

    dispatch(resumeUpload(file.id));
    uploadInstance.unpause();
  };

  const pause = () => {
    dispatch(pauseUpload(file.id));
    uploadInstance.pause();
  };

  const onDelete = () => {
    dispatch(deleteFiles([file.id]));
    dispatch(deleteUpload(file.id));
  };

  if (!uploadInstance && !props.reupload) {
    return null;
  }

  let button = (
    <IconButton onClick={pause} size="small">
      <Pause />
    </IconButton>
  );

  if (props.reupload) {
    button = (
      <span {...getRootProps()}>
        <input {...getInputProps()} />
        <IconButton
          color="primary"
          onChange={() => { }}
          size="small"
        >
          <PlayArrow />
        </IconButton>
      </span>
    );
  } else if (props.upload?.paused) {
    button = (
      <IconButton
        color="primary"
        onClick={resume}
        size="small"
      >
        <PlayArrow />
      </IconButton>
    );
  }

  const remainingFileSize = fileSize(size - uploaded);
  const progressPercentage = Math.floor((uploaded / size) * 100);

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
          {uploadInstance && `${progressPercentage}% uploaded (${remainingFileSize} remaining)`}
        </Typography>
      </ListItemText>
      <ListItemSecondaryAction className={s.itemActions}>
        {button}
        <IconButton onClick={onDelete} size="small">
          <Clear />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

UploadItem.propTypes = {
  reupload: PropTypes.bool,
  upload: PropTypes.shape().isRequired,
};

UploadItem.defaultProps = {
  reupload: false,
};

export default UploadItem;
