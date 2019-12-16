import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { ROUTES } from '../../constants';
import { getAuthToken } from '../../selectors/user';
import { fetchUsers } from '../../actions/users';
import { fetchBuildings } from '../../actions/buildings';

import Building from '../Building';
import Header from '../Header';
import Home from '../Home';
import Message from '../Message';
import NewBuilding from '../NewBuilding';
import PrivateRoute from '../PrivateRoute';
import Profile from '../Profile';

function App() {
  const dispatch = useDispatch();
  const token = useSelector(getAuthToken);

  useEffect(() => {
    if (token) {
      dispatch(fetchUsers()); // Fetch users per building only
      dispatch(fetchBuildings());
    }
  }, [dispatch, token]);

  return (
    <>
      <Message />
      <PrivateRoute>
        <Header />
        <Switch>
          <Route component={NewBuilding} exact path={ROUTES.building.main('new')} />
          <Route component={Profile} exact path={ROUTES.profile()} />
          <Route component={Building} path={ROUTES.building.main()} />
          <Route component={Home} />
        </Switch>
      </PrivateRoute>
    </>
  );
}

export default App;
