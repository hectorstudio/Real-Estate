import React, { useState, useEffect } from 'react';
import { Button, Snackbar, Typography } from '@material-ui/core';
import useForm from 'react-hook-form';
import { useDispatch } from 'react-redux';
import firebase from 'firebase/app';
import { push } from 'connected-react-router';

import { ROUTES } from '../../../../constants';

import TextField from '../../../UI/TextField';

import s from './index.module.scss';

function VerifyPhoneNumber(props) {
  const dispatch = useDispatch();
  const { errors, handleSubmit, register } = useForm();
  const [errorMessage, setErrorMessage] = useState();
  const [verifyDisabled, setVerifyDisabled] = useState(false);

  useEffect(() => {
    // TODO: abstract recaptcha
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('resendVerificationCode', {
      size: 'invisible',
      callback: () => setVerifyDisabled(true),
    });
  }, []);

  const onSubmit = (values) => {
    const { code } = values;

    window.confirmationResult.confirm(code)
      .then(() => {
        dispatch(push(ROUTES.home()));
      })
      .catch((err) => setErrorMessage(err.message));
  }

  const handleSnackBarClose = () => setErrorMessage();

  const resendVerificationCode = () => {
    setTimeout(() => setVerifyDisabled(false), 60000);

    props.user.linkWithPhoneNumber(props.phone, window.recaptchaVerifier)
      .then(function (confirmationResult) {
        window.confirmationResult = confirmationResult;
      }).catch((error) => {
        setErrorMessage(error.message);
      });
    }

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={!!errorMessage}
        onClose={handleSnackBarClose}
        message={errorMessage}
      />
      <Typography
        className={s.paragraph}
        variant="body1"
      >
        {'Enter a code that was sent to your mobile phone to activate your account.'}
      </Typography>
      <form
        className={s.form}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          autoFocus
          error={!!(errors && errors.email)}
          fullWidth
          inputRef={register({ required: true })}
          label="Code"
          name="code"
          required
        />
        <Button
          className={s.submit}
          color="primary"
          fullWidth
          type="submit"
          variant="contained"
        >
          {'Verify account'}
        </Button>
        <Button
          className={s.submit}
          color="primary"
          disabled={verifyDisabled}
          fullWidth
          id="resendVerificationCode"
          onClick={resendVerificationCode}
          type="button"
          variant="outlined"
        >
          {'Resend verification code'}
        </Button>
      </form>
    </>
  )
}

export default VerifyPhoneNumber;
