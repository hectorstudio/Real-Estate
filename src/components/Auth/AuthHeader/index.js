import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

import Logo from '../../../assets/logo3.svg';

import s from './index.module.scss';

function AuthHeader(props) {
  return (
    <div className={s.heading}>
      <div className={s.logoWrapper}>
        <img alt="Pocket Buildings" className={s.logo} src={Logo} />
      </div>
      <div className={s.divider} />
      <Typography
        className={s.title}
        component="h1"
        variant="h5"
      >
        {props.title}
      </Typography>
    </div>
  );
}

AuthHeader.propTypes = {
  title: PropTypes.string,
};

AuthHeader.defaultProps = {
  title: '',
};

export default AuthHeader;
