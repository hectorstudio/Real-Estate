import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';

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
import Container from '../UI/Container';

const useTheme = makeStyles((theme) => {
  console.log(theme);
  return {
    root: {
      background: theme.palette.background.default,
      height: '100%',
    },
  };
});

function App() {
  const dispatch = useDispatch();
  const token = useSelector(getAuthToken);

  const s = useTheme();

  useEffect(() => {
    if (token) {
      dispatch(fetchUsers()); // Fetch users per building only
      dispatch(fetchBuildings());
    }
  }, [dispatch, token]);

  return (
    <div className={s.root}>
      <Message />
      <PrivateRoute>
        <Header />
        <Container maxWidth="lg">
          <Switch>
            <Route component={NewBuilding} exact path={ROUTES.building.main('new')} />
            <Route component={Profile} path={ROUTES.profile.main()} />
            <Route component={Building} path={ROUTES.building.main()} />
            <Route component={Home} />
          </Switch>
        </Container>
      </PrivateRoute>
    </div>
  );
}

export default App;
