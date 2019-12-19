import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import LayoutPaper from '../../UI/LayoutPaper';
import Portfolios from './Portfolios';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
  },
  contentPaper: {
    boxSizing: 'border-box',
    height: 320,
    padding: theme.spacing(2),
  },
  rightColumn: {
    boxSizing: 'border-box',
    minHeight: 260,
    padding: theme.spacing(2),
    width: 260,
  },
}));

function Profile() {
  const s = useStyles();

  return (
    <>
      <Grid className={s.content} item>
        <LayoutPaper className={s.contentPaper}>
          <div>Profile page. Work in progress</div>
        </LayoutPaper>
      </Grid>
      <Grid item>
        <LayoutPaper className={s.rightColumn}>
          <Portfolios />
        </LayoutPaper>
      </Grid>
    </>
  );
}

export default Profile;
