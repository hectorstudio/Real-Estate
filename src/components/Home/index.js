import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Typography } from '@material-ui/core';

import { fetchBuildings } from '../../actions/buildings';

import BuildingList from './BuildingList';

import s from './index.module.scss';

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBuildings());
  }, [dispatch]);

  return (
    <>
      <Typography variant="h5">Your buildings</Typography>
      <BuildingList />
    </>
  );
}

export default Home;
