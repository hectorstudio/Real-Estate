import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { onAuthStateChanged } from '../../actions/firebase';
import { setIdToken } from '../../actions/auth';
import { fetchCurrentUser } from '../../actions/users';

import Loading from '../Loading';
import Auth from '../Auth';

function PrivateRoute(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
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
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return isAuthenticated
    ? props.children
    : <Auth />;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
