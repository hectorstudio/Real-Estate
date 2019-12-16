import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Avatar,
  Paper,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';

import { getCurrentBuildingId } from '../../../selectors/router';
import { getBuildingById } from '../../../selectors/buildings';

const useStyles = makeStyles((theme) => ({
  avatar: {
    borderRadius: 2,
    height: 140,
    width: 140,
  },
  avatarContainer: {
    height: 140,
    marginLeft: theme.spacing(1),
    marginTop: -theme.spacing(2),
    overflow: 'hidden',
    padding: theme.spacing(0.5),
    position: 'absolute',
    transform: 'translateY(-50%)',
    width: 140,
  },
  backdrop: {
    height: 200,
  },
  content: {
    minHeight: 80,
  },
  info: {
    marginLeft: 140 + theme.spacing(4),
  },
  root: {
    marginBottom: theme.spacing(3),
  },
}));

function Header() {
  const currentBuildingId = useSelector(getCurrentBuildingId);
  const building = useSelector((state) => getBuildingById(state, currentBuildingId)) || {};

  const s = useStyles();

  return (
    <Card className={s.root}>
      <CardMedia
        className={s.backdrop}
        image="https://images.unsplash.com/photo-1576460428852-d882ddd0099c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80"
        title="Header"
      />
      <CardContent className={s.content}>
        <Paper className={s.avatarContainer}>
          <Avatar className={s.avatar} variant="square" />
        </Paper>
        <div className={s.info}>
          <Typography variant="h6">{building.name}</Typography>
        </div>
      </CardContent>
    </Card>
  );
}

export default Header;
