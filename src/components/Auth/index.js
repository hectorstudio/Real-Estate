import React from 'react';
import { Container } from '@material-ui/core';
import { Route, Switch } from 'react-router';

import { ROUTES } from '../../constants';

import ForgotPassword from './ForgotPassword';
import SignIn from './SignIn';
import SignUp from './SignUp';

function Auth() {
  return (
    <Container component="main" maxWidth="xs">
      <Switch>
        <Route exact path={ROUTES.signUp()} render={() => <SignUp />} />
        <Route exact path={ROUTES.forgotPassword()} render={() => <ForgotPassword />} />
        <Route render={() => <SignIn />} />
      </Switch>
    </Container>
  );
}

export default Auth;
