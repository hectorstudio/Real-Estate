import React from 'react';
import { Route, Switch } from 'react-router';
import { useSelector } from 'react-redux';

import { ROUTES, ROLES } from '../../constants';
import { getBuildingById } from '../../selectors/buildings';
import { getCurrentBuildingId } from '../../selectors/router';

import Container from '../UI/Container';
import EditBuilding from './EditBuilding';
import Files from './Files';
import Sidebar from '../UI/Sidebar';
import Share from './Share';

function Building() {
  const currentBuildingId = useSelector(getCurrentBuildingId);
  const building = useSelector((state) => getBuildingById(state, currentBuildingId));

  return (
    <>
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
          {
            icon: 'share',
            label: 'Share',
            to: ROUTES.building.share(currentBuildingId),
          },
          building && building.role === ROLES.ADMIN && 'divider',
          building && building.role === ROLES.ADMIN && {
            icon: 'build',
            label: 'Preferences',
            to: ROUTES.building.edit(currentBuildingId),
          },
        ]}
      />
      <Container sidebar>
        <Switch>
          <Route component={EditBuilding} exact path={ROUTES.building.edit()} />
          <Route component={Files} exact path={ROUTES.building.files()} />
          <Route component={Files} exact path={ROUTES.building.main()} />
          <Route component={Share} exact path={ROUTES.building.share()} />
        </Switch>
      </Container>
    </>
  );
}

export default Building;
