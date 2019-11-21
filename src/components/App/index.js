import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router';
import { useDispatch } from 'react-redux';
import { Container } from '@material-ui/core';

import { onAuthStateChanged } from '../../actions/firebase';
import { saveUser } from '../../actions/auth';
import { ROUTES } from '../../constants';
import { getUserByFirebaseId } from '../../actions/users';

import Auth from '../Auth';
import Home from '../Home';
import Loading from '../Loading';
import Header from '../Header';
import Profile from '../Profile';

import s from './index.module.scss';

// TODO: Move auth logic to other component
function App() {
  const dispatch = useDispatch();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged((user) => {

      if (user && user.email) {
        user.getIdToken().then((token) => {
          getUserByFirebaseId(user.uid).then((data) => {
            dispatch(saveUser(data, token));
            setIsSignedIn(true);
            setIsLoading(false);
          });
        });
      } else {
        setIsLoading(false);
      }
    });
  }, [dispatch]);

  if (isLoading) {
    return <Loading />
  }

  if (!isSignedIn) {
    return <Auth />;
  }

  return (
    <div>
      <Header />
      <Container className={s.container}>
        <Switch>
          <Route exact path={ROUTES.profile()} component={Profile} />
          <Route component={Home} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
