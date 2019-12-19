import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { CardMedia, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Edit } from '@material-ui/icons';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import fileSize from 'filesize';

import { MAX_IMAGE_COVER_SIZE, ROLES } from '../../../../constants';
import { setMessage } from '../../../../actions/message';
import { getCurrentBuildingId } from '../../../../selectors/router';

import Dialog from '../../../UI/Dialog';
import { uploadBuildingCoverImage } from '../../../../actions/buildings';

const useStyles = makeStyles((theme) => ({
  button: {
    '&:hover': {
      background: 'rgba(0, 0, 0, 1)',
    },
    background: 'rgba(0, 0, 0, .5)',
    border: 'solid rgba(255, 255, 255, .5) 1px',
    borderRadius: 4,
    color: theme.palette.common.white,
    padding: theme.spacing(1),
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
  dialogContent: {
    '& > p': {
      lineHeight: '1.5em',
    },
    '& > p:first-of-type': {
      marginTop: 0,
    },
    '& > p:last-of-type': {
      marginBottom: 0,
    },
  },
  root: {
    background: theme.palette.grey[200],
    backgroundPosition: '50%',
    backgroundSize: 'cover',
    height: 250,
  },
}));

function Cover(props) {
  const dispatch = useDispatch();
  const currentBuildingId = useSelector(getCurrentBuildingId);
  const s = useStyles();

  const [dialogOpened, setDialogOpened] = useState(false);

  const toggleDialog = (open = false) => () => setDialogOpened(open);

  const onDrop = useCallback((files) => {
    if (!files.length) return;

    const file = files[0];

    if (file.size > MAX_IMAGE_COVER_SIZE) {
      dispatch(setMessage(`File size should not exceed ${fileSize(MAX_IMAGE_COVER_SIZE)}`));
      return;
    }

    dispatch(uploadBuildingCoverImage(currentBuildingId, file))
      .then(() => {
        dispatch(setMessage('Cover image has been uploaded.'));
      })
      .catch((err) => {
        dispatch(setMessage('Could not upload a cover image. Please try again later.'));
        console.error(err);
      });
    setDialogOpened(false);
  }, [currentBuildingId, dispatch]);

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: 'image/*',
    onDrop,
  });

  return (
    <>
      <CardMedia
        className={s.root}
        image={props.image}
        title={props.title}
      >
        <div />
      </CardMedia>
      <IconButton
        className={s.button}
        onClick={toggleDialog(true)}
      >
        <Edit />
      </IconButton>
      {props.userRole === ROLES.ADMIN && (
        <>
          <Dialog
            content={(
              <div className={s.dialogContent}>
                <p>
                  {'Upload a cover photo of this building. Prefered image size is '}
                  <b>1216 x 250 px</b>
                  {'.'}
                </p>
                <p>
                  {'File size should not exceed '}
                  <b>2 MB</b>
                  {'.'}
                </p>
              </div>
            )}
            okText="Choose file"
            onCancel={toggleDialog()}
            onOk={open}
            open={dialogOpened}
            title="Change cover photo"
          />
          <div {...getRootProps()}>
            <input {...getInputProps()} />
          </div>
        </>
      )}
    </>
  );
}

Cover.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  userRole: PropTypes.string,
};

Cover.defaultProps = {
  image: '',
  title: 'Building cover image',
  userRole: undefined,
};

export default Cover;
