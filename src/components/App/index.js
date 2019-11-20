import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router';
import { useDispatch } from 'react-redux';

import Auth from '../Auth';
import Home from '../Home';

import { onAuthStateChanged } from '../../actions/firebase';
import { saveUser } from '../../actions/auth';

function App() {
  const dispatch = useDispatch();
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged((user) => {
      if (user && user.email) {
        user.getIdToken().then((token) => {
          dispatch(saveUser(user, token));
          setIsSignedIn(true);
        });
      }
    });
  }, [dispatch]);

  let component = isSignedIn
    ? Home
    : Auth;

  return (
    <div>
      <Switch>
        <Route component={component} />
      </Switch>
    </div>
  );
}

export default App;
