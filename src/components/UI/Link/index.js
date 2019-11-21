import React from 'react';
import PropTypes from 'prop-types';
import { Link as MaterialLink } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

function Link(props) {
  return (
    <MaterialLink
      component={RouterLink}
      to={props.href}
      variant="body2"
      {...props}
    />
  );
}

Link.propTypes = {
  href: PropTypes.string.isRequired,
};

export default Link;
