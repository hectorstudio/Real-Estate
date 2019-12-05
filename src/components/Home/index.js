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

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBuildings());
  }, [dispatch]);

  return (
    <>
      <Grid container justify="space-between">
        <Grid item>
          <Typography variant="h5">Your buildings</Typography>
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
    </>
  );
}

export default Home;
