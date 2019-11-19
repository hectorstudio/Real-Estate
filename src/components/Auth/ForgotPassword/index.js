import React, { useState } from 'react';
import { Button, Grid, Snackbar, Typography } from '@material-ui/core';
import useForm from 'react-hook-form';

import { ROUTES } from '../../../constants';
import { sendPasswordResetEmail } from '../../../actions/firebase';

import AuthHeader from '../AuthHeader';
import Link from '../../UI/Link';
import TextField from '../../UI/TextField';

import s from './index.module.scss';

function ForgotPassword() {
  const { errors, handleSubmit, register } = useForm();
  const [errorMessage, setErrorMessage] = useState();

  const onSubmit = (values) => {
    const { email } = values;

    sendPasswordResetEmail(email)
      .catch((err) => setErrorMessage(err.message));
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
      <AuthHeader title="Reset password" />
      <form
        className={s.form}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          autoComplete="email"
          autoFocus
          error={!!(errors && errors.email)}
          fullWidth
          inputRef={register({ required: true })}
          label="Email Address"
          name="email"
          required
        />
        <Button
          className={s.submit}
          color="primary"
          fullWidth
          type="submit"
          variant="contained"
        >
          Reset password
        </Button>
        <Grid className={s.linkContainer}>
          <Typography className={s.link} variant="body2">
            {'Remember your password? '}
            <Link to={ROUTES.signIn()}>
              Sign in
            </Link>
          </Typography>
        </Grid>
      </form>
    </>
  )
}

export default ForgotPassword;
