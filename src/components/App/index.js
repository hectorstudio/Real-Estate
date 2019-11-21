import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router';
import { useDispatch } from 'react-redux';

import Auth from '../Auth';
import Home from '../Home';
import Loading from '../Loading';

import { onAuthStateChanged } from '../../actions/firebase';
import { saveUser } from '../../actions/auth';
import { ROUTES } from '../../constants';
import { getUserByFirebaseId } from '../../actions/users';

function App() {
  const dispatch = useDispatch();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged((user) => {
      setIsLoading(false);

      if (user && user.email) {
        user.getIdToken().then((token) => {
          getUserByFirebaseId(user.uid).then((data) => {
            dispatch(saveUser(data, token));
            setIsSignedIn(true);
          });
        });
      }
    });
  }, [dispatch]);

  let component = isSignedIn
    ? Home
    : Auth;

  if (isLoading) {
    return <Loading />
  }

  return (
    <div>
      <Switch>
        <Route exact path={ROUTES.signUp()} component={Auth} />
        <Route component={component} />
      </Switch>
    </div>
  );
}

export default App;
