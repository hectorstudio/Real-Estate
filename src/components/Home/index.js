import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Grid, Button } from '@material-ui/core';

import { fetchBuildings } from '../../actions/buildings';

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
          <Button color="primary" variant="contained">Add new building</Button>
        </Grid>
      </Grid>
      <BuildingList />
    </>
  );
}

export default Home;
