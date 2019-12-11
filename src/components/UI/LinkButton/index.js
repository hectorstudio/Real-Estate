import React from 'react';
import PropTypes from 'prop-types';
import { ButtonBase } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const LinkButton = React.forwardRef((props, ref) => (
  <ButtonBase
    component={RouterLink}
    ref={ref}
    to={props.href}
    {...props}
  />
));

LinkButton.propTypes = {
  href: PropTypes.string,
};

LinkButton.defaultProps = {
  href: '',
};

export default LinkButton;
