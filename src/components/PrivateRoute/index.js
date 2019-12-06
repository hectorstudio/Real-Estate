import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@material-ui/core';

import { onAuthStateChanged } from '../../actions/firebase';
import { setIdToken } from '../../actions/auth';
import { fetchCurrentUser } from '../../actions/users';
import { authActionModes, ROUTES } from '../../constants';
import { getQuery, getPathname } from '../../selectors/router';

import Auth from '../Auth';
import Loading from '../Loading';
import PasswordReset from '../Auth/PasswordReset';
import VerifyEmail from '../Auth/VerifyEmail';

function PrivateRoute(props) {
  const dispatch = useDispatch();
  const params = useSelector(getQuery);
  const pathname = useSelector(getPathname);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authRoutes = [ROUTES.signIn(), ROUTES.signUp(), ROUTES.forgotPassword()];
  const isAuthRoute = authRoutes.includes(pathname);

  useEffect(() => {
    if (isAuthRoute || isAuthenticated) {
      setLoading(false);
      return;
    }

    onAuthStateChanged((user) => {
      if (!user || !user.email) {
        setLoading(false);
        return;
      }

      user.getIdToken().then((token) => {
        // Save firebase auth token in redux
        dispatch(setIdToken(token));

        // Fetch user details. We pass token as first parameter because redux saved it asynchronously so it will be undefined.
        dispatch(fetchCurrentUser(token)).then(() => {
          setLoading(false);
          setIsAuthenticated(true);
        });
      });
    });
  }, [dispatch, isAuthRoute, isAuthenticated, pathname]);

  let actionComponent = null;
  switch (params.mode) {
    case authActionModes.resetPassword:
      actionComponent = <PasswordReset />;
      break;
    case authActionModes.verifyEmail:
      actionComponent = <VerifyEmail />;
      break;
    default:
  }

  if (actionComponent && params.oobCode) {
    return (
      <Container component="main" maxWidth="xs">
        {actionComponent}
      </Container>
    );
  }

  if (loading) {
    return <Loading />;
  }

  return (isAuthenticated && !isAuthRoute)
    ? props.children
    : <Auth />;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
