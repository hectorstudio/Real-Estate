import React, { useCallback, useState } from 'react';
import { Button, LinearProgress, Grid } from '@material-ui/core';
import GcsBrowserUploadStream from 'gcs-browser-upload-stream';
import { useDispatch } from 'react-redux';

import { addNewFile } from '../../actions/files';
import { setMessage } from '../../actions/message';

import FileList from '../FileList';

import s from './index.module.scss';

function Home() {
  const dispatch = useDispatch();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadInstance, setUploadInstance] = useState();

  const onProgress = useCallback((progress) => {
    setUploadProgress(progress * 100);
  }, []);

  const clearUpload = useCallback(() => {
    setUploadInstance();
    setUploadProgress(0);
  }, []);

  const onChange = useCallback(async (e) => {
    if (!e.target.files.length) return;

    const file = e.target.files[0];

    dispatch(addNewFile(file.name)).then((data) => {
      const { url } = data;

      console.log(data);
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
      .catch(() => {
        dispatch(setMessage('There was an error during file upload. Please try again.'));
      });
  }, [clearUpload, dispatch, onProgress]);

  return (
    <>
      <div className={s.root}>
        You are logged in.
      </div>
      <input
        accept="*"
        id="contained-button-file"
        multiple
        onChange={onChange}
        style={{ display: 'none' }}
        type="file"
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="contained-button-file">
        <Button color="primary" component="span" variant="contained">
          Upload
        </Button>
      </label>
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
