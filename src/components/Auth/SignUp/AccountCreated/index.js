import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

import s from './index.module.scss';
import { ROUTES } from '../../../../constants';

function AccountCreated(props) {
  const dispatch = useDispatch();

  const goToLoginPage = () => dispatch(push(ROUTES.home()));

  return (
    <>
      <Typography
        className={s.paragraph}
        variant="body1"
      >
        {'A verification email has been sent to '}
        <b>{props.email}</b>
        {'.'}
      </Typography>
      <Typography
        className={s.paragraph}
        variant="body1"
      >
        {'Please click on the link attached to the email to activate your account.'}
      </Typography>
      <Button
        className={s.button}
        color="primary"
        fullWidth
        id="phoneVerifyButton"
        onClick={goToLoginPage}
        variant="outlined"
      >
        Go back to login page
      </Button>
    </>
  );
}

AccountCreated.propTypes = {
  email: PropTypes.string.isRequired,
};

export default AccountCreated;
