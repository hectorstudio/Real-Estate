import React, { useState } from 'react';
import { Button, Grid, Snackbar, Typography } from '@material-ui/core';
import useForm from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { ROUTES } from '../../../constants';
import { saveUser } from '../../../actions/auth';
import { signInWithEmailAndPassword } from '../../../actions/firebase';

import AuthHeader from '../AuthHeader';
import Link from '../../UI/Link';
import TextField from '../../UI/TextField';

import s from './index.module.scss';

function SignIn() {
  const dispatch = useDispatch();
  const { errors, handleSubmit, register } = useForm();
  const [errorMessage, setErrorMessage] = useState();

  const onSubmit = (values) => {
    const { email, password } = values;

    signInWithEmailAndPassword(email, password)
      .then((user) => {
        if (user.email) {
          user.getIdToken().then((token) => {
            dispatch(saveUser(user, token));
          });
        }
      })
      .catch((err) => {
        setErrorMessage(err.message);
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
      <AuthHeader title="Sign in" />
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
        <TextField
          autoComplete="current-password"
          error={!!(errors && errors.password)}
          fullWidth
          id="password"
          inputRef={register({ required: true })}
          label="Password"
          name="password"
          required
          type="password"
        />
        <Button
          className={s.submit}
          color="primary"
          fullWidth
          type="submit"
          variant="contained"
        >
          Sign In
        </Button>
        <Grid className={s.linkContainer}>
          <Link
            className={s.link}
            to={ROUTES.forgotPassword()}
          >
            Forgot password?
          </Link>
          <Typography className={s.link} variant="body2">
            {'Don\'t have an account? '}
            <Link to={ROUTES.signUp()}>
              Sign Up
            </Link>
          </Typography>
        </Grid>
      </form>
    </>
  )
}

export default SignIn;
