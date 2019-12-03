import React, { useCallback, useEffect } from 'react';
import GcsBrowserUploadStream from 'gcs-browser-upload-stream';
import { useDispatch } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { Grid, Paper } from '@material-ui/core';
import clsx from 'clsx';

import { addNewFile } from '../../actions/files';
import { addNewUpload, deleteUpload, updateUpload } from '../../actions/uploads';
import { fetchUsers } from '../../actions/users';
import { setMessage } from '../../actions/message';

import FileList from '../FileList';
import UploadList from '../UploadList';

import s from './index.module.scss';

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const onUploadProgress = useCallback((uploadId, uploaded, totalBytes) => {
    dispatch(updateUpload(uploadId, uploaded, totalBytes));
  }, [dispatch]);

  const clearUpload = useCallback((id) => {
    dispatch(deleteUpload(id));
  }, [dispatch]);

  const onChange = useCallback((files) => {
    if (!files.length) return;

    const file = files[0];

    dispatch(addNewFile(file.name, file.size)).then((data) => {
      const { file: fileObj, url } = data;

      const uploadId = fileObj.id;

      const params = {
        chunkSize: 262144 * 40, // ~10MB
        file,
        id: uploadId,
        onProgress: (info) => {
          onUploadProgress(uploadId, info.uploadedBytes, info.totalBytes);

          if (info.uploadedBytes === info.totalBytes) {
            dispatch(setMessage('Upload completed'));
            clearUpload(uploadId);
          }
        },
        resumable: true,
        storage: window.localStorage,
        url,
      };
      const instance = new GcsBrowserUploadStream.Upload(params);

      instance.start();

      dispatch(addNewUpload(uploadId, file.size, instance));
    })
      .catch((err) => {
        dispatch(setMessage('There was an error during file upload. Please try again.'));
        console.error(err);
      });
  }, [clearUpload, dispatch, onUploadProgress]);

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
    <>
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
      <UploadList />
      <FileList />
    </>
  );
}

export default Home;
