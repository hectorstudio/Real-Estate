import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import {
  Button,
  Grid,
  Typography,
} from '@material-ui/core';

import { fetchBuildings } from '../../actions/buildings';
import { ROUTES } from '../../constants';

import BuildingList from './BuildingList';

import s from './index.module.scss';

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBuildings());
  }, [dispatch]);

  return (
    <Grid
      className={s.root}
      container
      direction="column"
    >
      <Grid container justify="space-between">
        <Grid item>
          <Typography variant="h5">All buildings</Typography>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            onClick={() => dispatch(push(ROUTES.building('new')))}
            variant="contained"
          >
            Add new building
          </Button>
        </Grid>
      </Grid>
      <BuildingList />
    </Grid>
  );
}

export default Home;
