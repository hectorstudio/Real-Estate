import React, { useCallback, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Button, Grid } from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import fileSize from 'filesize';
import Crop from 'react-easy-crop';

import { getCurrentUser } from '../../../selectors/user';
import { setMessage } from '../../../actions/message';
import { MAX_USER_PHOTO_SIZE } from '../../../constants';
import { uploadUserPhotoImage, deleteUserPhotoImage } from '../../../actions/users';
import { getCroppedImg } from '../../../helpers/imageCrop';

import UserAvatar from '../../UserAvatar';
import Dialog from '../../UI/Dialog';

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: theme.spacing(15),
    width: theme.spacing(15),
  },
  buttonContainer: {
    width: 'auto',
  },
  cropContainer: {
    height: 280,
    position: 'relative',
    width: 280,
  },
}));

function PhotoForm() {
  const s = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(getCurrentUser);

  const [image, setImage] = useState();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const uploadedFile = useRef();

  const onDrop = useCallback((files) => {
    if (!files.length) return;

    const file = files[0];

    if (file.size > MAX_USER_PHOTO_SIZE) {
      dispatch(setMessage(`File size should not exceed ${fileSize(MAX_USER_PHOTO_SIZE)}`));
      return;
    }

    uploadedFile.current = file;
    setImage(URL.createObjectURL(file));
  }, [dispatch]);

  const onSave = useCallback(() => {
    getCroppedImg(uploadedFile.current, croppedAreaPixels).then((img) => {
      fetch(img).then((res) => res.blob()).then((file) => {
        setImage();

        dispatch(uploadUserPhotoImage(file))
          .then(() => {
            dispatch(setMessage('Profile image has been updated.'));
          })
          .catch((err) => {
            dispatch(setMessage('Could not upload a profile image. Please try again later.'));
            console.error(err);
          });
      });
    })
      .catch((err) => {
        dispatch(setMessage('There was an error when trying to crop this image. Please try again.'));
        console.error(err);
      });
  }, [croppedAreaPixels, dispatch]);

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

  const onCropComplete = useCallback((croppedArea, croppedAreaPx) => {
    setCroppedAreaPixels(croppedAreaPx);
  }, []);

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
      <Dialog
        content={(
          <div className={s.cropContainer}>
            <Crop
              aspect={1}
              crop={crop}
              cropShape="round"
              cropSize={{ height: 140, width: 140 }}
              image={image}
              minZoom={0.5}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              showGrid={false}
              zoom={zoom}
            />
          </div>
        )}
        onCancel={() => setImage()}
        onOk={onSave}
        open={!!image}
        title="Adjust image"
      />
      <div {...getRootProps()}>
        <input {...getInputProps()} />
      </div>
    </Grid>
  );
}

export default PhotoForm;
