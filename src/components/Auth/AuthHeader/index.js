import React from 'react';
import { Typography } from '@material-ui/core';

import City from '../../../assets/city';

import s from './index.module.scss';

function AuthHeader(props) {
  return (
    <div className={s.heading}>
      <div className={s.logo}>
        <City />
      </div>
      <Typography
        className={s.title}
        component="h1"
        variant="h5"
      >
        {props.title}
      </Typography>
    </div>
  )
}

export default AuthHeader;
