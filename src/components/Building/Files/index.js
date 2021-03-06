import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { Grid, Paper } from '@material-ui/core';
import clsx from 'clsx';

import { UPLOAD_CONFIG, ROLES } from '../../../constants';
import { addNewFile, markFileAsUploaded } from '../../../actions/files';
import { addNewUpload, deleteUpload, updateUpload } from '../../../actions/uploads';
import { createUploadInstance, getUploadUrlStorageItemKey } from '../../../helpers';
import { getCurrentBuildingId } from '../../../selectors/router';
import { setMessage } from '../../../actions/message';
import { getCurrentUser } from '../../../selectors/user';
import { getBuildingPermissionByBuildingIdAndUserId } from '../../../selectors/buildings';

import FileList from '../../FileList';
import UploadList from '../../UploadList';
import LayoutPaper from '../../UI/LayoutPaper';

import s from './index.module.scss';

function Files() {
  const dispatch = useDispatch();
  const currentBuildingId = useSelector(getCurrentBuildingId);
  const user = useSelector(getCurrentUser);
  const permission = useSelector((state) => getBuildingPermissionByBuildingIdAndUserId(state, currentBuildingId, user.id)) || {};

  const clearUpload = useCallback((id) => {
    dispatch(deleteUpload(id));
  }, [dispatch]);

  const onUploadProgress = useCallback((uploadId, uploaded, totalBytes) => {
    dispatch(updateUpload(uploadId, uploaded, totalBytes));
  }, [dispatch]);

  const onUploadComplete = useCallback((uploadId) => {
    dispatch(markFileAsUploaded(uploadId));
    clearUpload(uploadId);
    dispatch(setMessage('Upload completed'));
  }, [clearUpload, dispatch]);

  const onChange = useCallback((files) => {
    if (!files.length) return;

    files.forEach((file) => {
      dispatch(addNewFile(currentBuildingId, file.name, file.size)).then((data) => {
        const { file: fileObj, url } = data;

        const uploadId = fileObj.id;

        const params = {
          file,
          id: uploadId,
          url,
        };
        const newUploadInstance = createUploadInstance(params, onUploadProgress, onUploadComplete);

        dispatch(addNewUpload(uploadId, file.size, newUploadInstance));

        const key = getUploadUrlStorageItemKey(fileObj.id);
        window.localStorage.setItem(key, JSON.stringify({
          expire: UPLOAD_CONFIG.uploadUrlExpiry,
          url,
        }));

        setTimeout(() => {
          newUploadInstance.start();
        }, 0);
      })
        .catch((err) => {
          dispatch(setMessage('There was an error during file upload. Please try again.'));
          console.error(err);
        });
    });
  }, [currentBuildingId, dispatch, onUploadComplete, onUploadProgress]);

  const {
    getRootProps: getRootProps1,
    getInputProps: getInputProps1,
  } = useDropzone({
    noDrag: true,
    onDrop: onChange,
  });

  const {
    getRootProps: getRootProps2,
    getInputProps: getInputProps2,
    isDragActive: isDragActive2,
  } = useDropzone({
    noClick: true,
    noKeyboard: true,
    onDrop: onChange,
  });

  return (
    <Grid className={s.root} item>
      {[ROLES.CONTRIBUTOR, ROLES.EDITOR, ROLES.ADMIN].includes(permission.role) && (
        <Grid className={s.uploadContainer} container spacing={6}>
          <Grid item xs={4}>
            <Paper>
              <Grid
                {...getRootProps1()}
                alignItems="center"
                className={clsx(s.tile, s.clickable)}
                container
                justify="center"
              >
                <Grid>
                  <input {...getInputProps1()} />
                  Select an item to upload
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper>
              <Grid
                {...getRootProps2()}
                alignItems="center"
                className={s.tile}
                container
                justify="center"
              >
                <Grid>
                  <input {...getInputProps2()} />
                  {
                    isDragActive2
                      ? 'Drop files here'
                      : 'Drag files to upload'
                  }
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid className={s.notImplemented} item xs={4}>
            <Paper>
              <Grid
                alignItems="center"
                className={s.tile}
                container
                justify="center"
              >
                <Grid>
                  Upload files from Dropbox
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      )}
      <UploadList />
      <LayoutPaper>
        <FileList />
      </LayoutPaper>
    </Grid>
  );
}

export default Files;
