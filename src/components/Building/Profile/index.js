import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import LayoutPaper from '../../UI/LayoutPaper';

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
    height: 260,
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
          <Typography variant="body1">Portfolio</Typography>
        </LayoutPaper>
      </Grid>
    </>
  );
}

export default Profile;
