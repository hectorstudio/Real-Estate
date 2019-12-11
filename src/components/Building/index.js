import React from 'react';
import { Route, Switch } from 'react-router';
import { useSelector } from 'react-redux';

import { getCurrentBuildingId } from '../../selectors/router';
import { ROUTES } from '../../constants';

import Container from '../UI/Container';
import EditBuilding from './EditBuilding';
import Files from './Files';
import Sidebar from '../UI/Sidebar';

function Building() {
  const currentBuildingId = useSelector(getCurrentBuildingId);

  return (
    <>
      <Sidebar
        items={[
          {
            icon: 'folder_open',
            label: 'Files',
            to: ROUTES.building.main(currentBuildingId),
          },
          {
            icon: 'build',
            label: 'Preferences',
            to: ROUTES.building.edit(currentBuildingId),
          },
        ]}
      />
      <Container sidebar>
        <Switch>
          <Route component={EditBuilding} exact path={ROUTES.building.edit()} />
          <Route component={Files} exact path={ROUTES.building.main()} />
        </Switch>
      </Container>
    </>
  );
}

export default Building;
