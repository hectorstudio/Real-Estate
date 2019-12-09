import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog as MaterialDialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

function Dialog(props) {
  return (
    <MaterialDialog
      aria-labelledby="confirmation-dialog-title"
      maxWidth="xs"
      open={props.open}
    >
      <DialogTitle id="confirmation-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        {props.content}
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          color="primary"
          onClick={props.onCancel}
        >
          {props.cancelText}
        </Button>
        <Button color="primary" onClick={props.onOk}>
          {props.okText}
        </Button>
      </DialogActions>
    </MaterialDialog>
  );
}

Dialog.propTypes = {
  cancelText: PropTypes.string,
  content: PropTypes.node.isRequired,
  okText: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
  open: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

Dialog.defaultProps = {
  cancelText: 'Cancel',
  okText: 'Ok',
  open: false,
};

export default Dialog;
