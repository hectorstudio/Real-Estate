import React from 'react';
import {
  Card,
  CardContent,
  Avatar,
  Paper,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';

import { getCurrentBuildingId } from '../../../selectors/router';
import { getBuildingById, getBuildingPermissionByBuildingIdAndUserId } from '../../../selectors/buildings';
import { getCurrentUser } from '../../../selectors/user';

import Cover from './Cover';

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
  content: {
    minHeight: 80,
  },
  info: {
    marginLeft: 140 + theme.spacing(4),
  },
  root: {
    marginBottom: theme.spacing(3),
    position: 'relative',
  },
}));

function Header() {
  const currentBuildingId = useSelector(getCurrentBuildingId);
  const building = useSelector((state) => getBuildingById(state, currentBuildingId)) || {};
  const user = useSelector(getCurrentUser);
  const permission = useSelector((state) => getBuildingPermissionByBuildingIdAndUserId(state, currentBuildingId, user.id)) || {};

  const s = useStyles();

  return (
    <Card className={s.root}>
      <Cover
        image={building.coverPath}
        title={building.name}
        userRole={permission.role}
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
