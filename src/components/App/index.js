import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router';
import { useDispatch } from 'react-redux';

import Auth from '../Auth';

import { onAuthStateChanged } from '../../actions/firebase';

import { saveUser } from '../../actions/auth';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged((user) => {
      if (user && user.email) {
        user.getIdToken().then((token) => {
          dispatch(saveUser(user, token));
          console.log('SIGNED IN');
        });
      }
    });
  }, [dispatch]);

  return (
    <div>
      <Switch>
        <Route render={() => <Auth />} />
      </Switch>
    </div>
  );
}

export default App;
