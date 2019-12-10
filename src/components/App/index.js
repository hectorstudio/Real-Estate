import React from 'react';
import { Route, Switch } from 'react-router';
import { Container } from '@material-ui/core';

import { ROUTES } from '../../constants';

import Building from '../Building';
import EditBuilding from '../EditBuilding';
import Header from '../Header';
import Home from '../Home';
import Message from '../Message';
import NewBuilding from '../NewBuilding';
import PrivateRoute from '../PrivateRoute';
import Profile from '../Profile';

import s from './index.module.scss';

function App() {
  return (
    <>
      <Message />
      <PrivateRoute>
        <Header />
        <Container className={s.container}>
          <Switch>
            <Route component={NewBuilding} exact path={ROUTES.building.main('new')} />
            <Route component={EditBuilding} exact path={ROUTES.building.edit()} />
            <Route component={Profile} exact path={ROUTES.profile()} />
            <Route component={Building} exact path={ROUTES.building.main()} />
            <Route component={Home} />
          </Switch>
        </Container>
      </PrivateRoute>
    </>
  );
}

export default App;
