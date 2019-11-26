import React, { useCallback, useState } from 'react';
import { Button, LinearProgress, Grid } from '@material-ui/core';
import GcsBrowserUploadStream from 'gcs-browser-upload-stream';

import s from './index.module.scss';

function Home() {
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

    const response = await fetch('http://localhost:9000/files', {
      body: JSON.stringify({ content_type: file.type, name: file.name }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    const uploadUrl = await response.json();

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
      url: uploadUrl,
    };
    const instance = new GcsBrowserUploadStream.Upload(params);

    setUploadInstance(instance);
    instance.start();
  }, [clearUpload, onProgress]);

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
    </>
  );
}

export default Home;
