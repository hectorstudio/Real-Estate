import React from 'react';
import { Route, Switch } from 'react-router';
import { Container } from '@material-ui/core';

import { ROUTES } from '../../constants';

import Header from '../Header';
import Home from '../Home';
import PrivateRoute from '../PrivateRoute';
import Profile from '../Profile';

import s from './index.module.scss';

function App() {
  return (
    <PrivateRoute>
      <Header />
      <Container className={s.container}>
        <Switch>
          <Route component={Profile} exact path={ROUTES.profile()} />
          <Route component={Home} />
        </Switch>
      </Container>
    </PrivateRoute>
  );
}

export default App;
