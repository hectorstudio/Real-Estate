import React from 'react';
import { TextField as MaterialTextField } from '@material-ui/core';

function TextField(props) {
  return (
    <MaterialTextField
      margin="normal"
      variant="outlined"
      {...props}
    />
  );
}

export default TextField;
