import React from 'react';
import { Route, Switch } from 'react-router';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';

import { ROUTES, ROLES } from '../../constants';
import { getBuildingPermissionByBuildingIdAndUserId } from '../../selectors/buildings';
import { getCurrentBuildingId } from '../../selectors/router';
import { getCurrentUser } from '../../selectors/user';

import EditBuilding from './EditBuilding';
import Files from './Files';
import Sidebar from '../UI/Sidebar';
import Share from './Share';
import Profile from './Profile';
import Header from './Header';

function Building() {
  const currentBuildingId = useSelector(getCurrentBuildingId);
  const user = useSelector(getCurrentUser);
  const permission = useSelector((state) => getBuildingPermissionByBuildingIdAndUserId(state, currentBuildingId, user.id)) || {};

  return (
    <>
      <Header />
      <Grid container spacing={3}>
        <Grid item>
          <Sidebar
            items={[
              {
                icon: 'home',
                label: 'Overview',
                to: ROUTES.building.main(currentBuildingId),
              },
              {
                icon: 'folder_open',
                label: 'Files',
                to: ROUTES.building.files(currentBuildingId),
              },
              [ROLES.EDITOR, ROLES.ADMIN].includes(permission.role) && {
                icon: 'share',
                label: 'Share',
                to: ROUTES.building.share(currentBuildingId),
              },
              [ROLES.ADMIN].includes(permission.role) && {
                icon: 'build',
                label: 'Preferences',
                to: ROUTES.building.edit(currentBuildingId),
              },
            ]}
          />
        </Grid>
        <Switch>
          <Route component={EditBuilding} exact path={ROUTES.building.edit()} />
          <Route component={Files} exact path={ROUTES.building.files()} />
          <Route component={Share} exact path={ROUTES.building.share()} />
          <Route component={Profile} exact path={ROUTES.building.main()} />
        </Switch>
      </Grid>
    </>
  );
}

export default Building;
