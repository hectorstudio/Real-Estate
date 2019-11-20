import React from 'react';
import { CircularProgress, Grid } from '@material-ui/core';

import s from './index.module.scss';

function Loading(props) {
  return (
    <Grid
      alignItems="center"
      className={s.root}
      container
      justify="center"
    >
      <Grid item>
        <CircularProgress />
      </Grid>
    </Grid>
  )
}

export default Loading;
