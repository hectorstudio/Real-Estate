import React from 'react';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

import { ROUTES } from '../../constants';
import { signOut } from '../../actions/firebase';

import s from './index.module.scss';

function Home() {
  const dispatch = useDispatch();

  const doSignOut = () => {
    signOut();
    dispatch(push(ROUTES.home()));
    window.location.reload();
  }

  return (
    <div className={s.root}>
      You are logged in.
      <br />
      <Button
        color="primary"
        onClick={doSignOut}
        variant="contained"
      >
        Sign out
      </Button>
    </div>
  );
}

export default Home;
