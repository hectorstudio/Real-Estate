import React from 'react';
import {
  Card,
  CardContent,
  Avatar,
  Paper,
  Typography,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';

import styles from '../../../styles';
import { getBuildingById, getBuildingPermissionByBuildingIdAndUserId } from '../../../selectors/buildings';
import { getCurrentBuildingId } from '../../../selectors/router';
import { getCurrentUser } from '../../../selectors/user';
import { getMapUrl } from '../../../helpers';

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
    paddingLeft: 140 + theme.spacing(4),
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
    <Card className={s.root} elevation={styles.elevation}>
      <Cover
        address={building.address}
        image={building.coverPath}
        title={building.name}
        userRole={permission.role}
      />
      <CardContent className={s.content}>
        <Paper className={s.avatarContainer} elevation={styles.elevation}>
          <Avatar
            className={s.avatar}
            src={building.address ? getMapUrl(building.address) : ''}
            variant="square"
          />
        </Paper>
        <Grid
          className={s.info}
          container
          direction="column"
          spacing={1}
        >
          <Grid item>
            <Typography variant="h5">{building.name}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">{building.address}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default Header;
