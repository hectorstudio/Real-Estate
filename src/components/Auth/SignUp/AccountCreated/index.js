import React, { useState, useEffect } from 'react';
import { Button, Snackbar, Typography } from '@material-ui/core';
import useForm from 'react-hook-form';
import clsx from 'clsx';
import firebase from 'firebase/app';

import TextField from '../../../UI/TextField';

import s from './index.module.scss';

function AccountCreated(props) {
  const { errors, handleSubmit, register } = useForm();
  const [errorMessage, setErrorMessage] = useState();
  const [verifyDisabled, setVerifyDisabled] = useState(false);

  useEffect(() => {
    // TODO: abstract recaptcha
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('phoneVerifyButton', {
      size: 'invisible',
      callback: () => setVerifyDisabled(true),
    });
  }, []);

  const onSubmit = (values) => {
    const { phone } = values;

    props.user.linkWithPhoneNumber(phone, window.recaptchaVerifier)
      .then(function (confirmationResult) {
        window.confirmationResult = confirmationResult;

        props.onPhoneSubmit(phone);
      }).catch((error) => {
        setErrorMessage(error.message);
      });
  }

  const handleSnackBarClose = () => setErrorMessage();

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
      <Typography
        className={s.divider}
        variant="h6"
      >
        {'or'}
      </Typography>
      <Typography
        className={clsx(s.paragraph, s.phoneLabel)}
        variant="body1"
      >
        {'Activate your account by entering a secret code that we will send you on your mobile.'}
      </Typography>
      <form
        className={s.form}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          autoComplete="tel"
          error={!!(errors && errors.phone)}
          fullWidth
          inputRef={register({ required: true })}
          label="Phone number"
          name="phone"
          required
        />
        <Button
          className={s.submit}
          color="primary"
          fullWidth
          id="phoneVerifyButton"
          type="submit"
          variant="contained"
          disabled={verifyDisabled}
        >
          Verify account
        </Button>
      </form>
    </>
  )
}

export default AccountCreated;
