import React from 'react';
import { Route, Switch } from 'react-router';
import { Container } from '@material-ui/core';

import { ROUTES } from '../../constants';

import Header from '../Header';
import Home from '../Home';
import Message from '../Message';
import PrivateRoute from '../PrivateRoute';
import Profile from '../Profile';
import Building from '../Building';
import NewBuilding from '../NewBuilding';

import s from './index.module.scss';

function App() {
  return (
    <>
      <Message />
      <PrivateRoute>
        <Header />
        <Container className={s.container}>
          <Switch>
            <Route component={NewBuilding} exact path={ROUTES.building('new')} />
            <Route component={Profile} exact path={ROUTES.profile()} />
            <Route component={Building} exact path={ROUTES.building()} />
            <Route component={Home} />
          </Switch>
        </Container>
      </PrivateRoute>
    </>
  );
}

export default App;
