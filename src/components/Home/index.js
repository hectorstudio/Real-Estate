import React, { useCallback, useState, useEffect } from 'react';
import GcsBrowserUploadStream from 'gcs-browser-upload-stream';
import { useDispatch } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import {
  Button,
  LinearProgress,
  Grid,
  Paper,
} from '@material-ui/core';
import clsx from 'clsx';

import { addNewFile } from '../../actions/files';
import { fetchUsers } from '../../actions/users';
import { setMessage } from '../../actions/message';

import FileList from '../FileList';

import s from './index.module.scss';

function Home() {
  const dispatch = useDispatch();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadInstance, setUploadInstance] = useState();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const onProgress = useCallback((progress) => {
    setUploadProgress(progress * 100);
  }, []);

  const clearUpload = useCallback(() => {
    setUploadInstance();
    setUploadProgress(0);
  }, []);

  const onChange = useCallback((files) => {
    if (!files.length) return;

    const file = files[0];

    dispatch(addNewFile(file.name)).then((data) => {
      const { url } = data;

      const params = {
        chunkSize: 262144 * 40, // ~10MB
        file,
        id: `${file.name}-${new Date().getTime()}`,
        onProgress: (info) => {
          console.log(info.uploadedBytes / info.totalBytes);
          onProgress(info.uploadedBytes / info.totalBytes);
          if (info.uploadedBytes === info.totalBytes) {
            alert('Upload completed');
            clearUpload();
          }
        },
        resumable: true,
        storage: window.localStorage,
        url,
      };
      const instance = new GcsBrowserUploadStream.Upload(params);

      setUploadInstance(instance);
      instance.start();
    })
      .catch((err) => {
        dispatch(setMessage('There was an error during file upload. Please try again.'));
        console.error(err);
      });
  }, [clearUpload, dispatch, onProgress]);

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
      <LinearProgress
        className={s.progress}
        value={uploadProgress}
        variant="determinate"
      />
      <Grid container>
        <Grid className={s.item} item>
          <Button
            color="primary"
            component="span"
            disabled={!uploadInstance}
            onClick={() => uploadInstance.pause()}
            variant="outlined"
          >
            Pause
          </Button>
        </Grid>
        <Grid className={s.item} item>
          <Button
            color="primary"
            component="span"
            disabled={!uploadInstance}
            onClick={() => uploadInstance.unpause()}
            variant="outlined"
          >
            Continue
          </Button>
        </Grid>
      </Grid>
      <FileList />
    </>
  );
}

export default Home;
