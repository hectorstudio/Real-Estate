import React from 'react';
import PropTypes from 'prop-types';
import { Snackbar as MUISnackbar } from '@material-ui/core';

function Snackbar(props) {
  return (
    <MUISnackbar
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'top',
      }}
      autoHideDuration={3000}
      open={!!props.message}
      {...props}
    />
  );
}

Snackbar.propTypes = {
  message: PropTypes.string,
};

Snackbar.defaultProps = {
  message: undefined,
};

export default Snackbar;
