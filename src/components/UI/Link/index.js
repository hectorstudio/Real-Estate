import React from 'react';
import { Link as MaterialLink } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

function Link(props) {
  return (
    <MaterialLink
      component={RouterLink}
      variant="body2"
      to={props.href}
      {...props}
    />
  );
}

export default Link;
