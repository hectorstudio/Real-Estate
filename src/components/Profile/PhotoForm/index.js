import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Button, Grid } from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import fileSize from 'filesize';

import { getCurrentUser } from '../../../selectors/user';
import { setMessage } from '../../../actions/message';
import { MAX_USER_PHOTO_SIZE } from '../../../constants';
import { uploadUserPhotoImage, deleteUserPhotoImage } from '../../../actions/users';
import UserAvatar from '../../UserAvatar';

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: theme.spacing(15),
    width: theme.spacing(15),
  },
  buttonContainer: {
    width: 'auto',
  },
}));

function PhotoForm() {
  const s = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(getCurrentUser);

  const onDrop = useCallback((files) => {
    if (!files.length) return;

    const file = files[0];

    if (file.size > MAX_USER_PHOTO_SIZE) {
      dispatch(setMessage(`File size should not exceed ${fileSize(MAX_USER_PHOTO_SIZE)}`));
      return;
    }

    dispatch(uploadUserPhotoImage(file))
      .then(() => {
        dispatch(setMessage('Profile image has been updated.'));
      })
      .catch((err) => {
        dispatch(setMessage('Could not upload a profile image. Please try again later.'));
        console.error(err);
      });
  }, [dispatch]);

  const deletePhoto = useCallback(() => {
    dispatch(deleteUserPhotoImage())
      .then(() => {
        dispatch(setMessage('Profile image has been deleted.'));
      })
      .catch((err) => {
        dispatch(setMessage('Could not delete a profile image. Please try again later.'));
        console.error(err);
      });
  }, [dispatch]);

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: 'image/*',
    onDrop,
  });

  return (
    <Grid container spacing={10}>
      <Grid item>
        <UserAvatar className={s.avatar} user={user} />
      </Grid>
      <Grid
        className={s.buttonContainer}
        container
        direction="column"
        item
        justify="space-evenly"
      >
        <Grid item>
          <Button
            color="primary"
            onClick={open}
            variant="outlined"
          >
            Upload a photo
          </Button>
        </Grid>
        <Grid item>
          <Button
            color="secondary"
            disabled={!user.photoUrl}
            onClick={deletePhoto}
            variant="outlined"
          >
            Delete current photo
          </Button>
        </Grid>
      </Grid>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
      </div>
    </Grid>
  );
}

export default PhotoForm;
