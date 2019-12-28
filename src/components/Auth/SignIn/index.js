import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button, Grid, Typography } from '@material-ui/core';
import { push } from 'connected-react-router';

import signInForm from '../../../constants/validation/signInForm';
import { ROUTES } from '../../../constants';
import { getFirebaseErrorMessage } from '../../../helpers';
import { saveUser } from '../../../actions/auth';
import { setMessage } from '../../../actions/message';
import { signInWithEmailAndPassword } from '../../../actions/firebase';

import AuthHeader from '../AuthHeader';
import Link from '../../UI/Link';
import TextField from '../../UI/TextField';

import s from './index.module.scss';

function SignIn() {
  const dispatch = useDispatch();
  const { errors, handleSubmit, register } = useForm({
    validationSchema: signInForm,
  });

  const onSubmit = (values) => {
    const { email, password } = values;

    signInWithEmailAndPassword(email, password)
      .then((user) => {
        if (user.email) {
          user.getIdToken().then((token) => {
            dispatch(saveUser(user, token));
            dispatch(push(ROUTES.home()));
          });
        }
      })
      .catch((err) => {
        const message = getFirebaseErrorMessage(err);
        dispatch(setMessage(message));
      });
  };

  return (
    <>
      <AuthHeader title="Sign in" />
      <form
        className={s.form}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          autoComplete="email"
          autoFocus
          error={!!(errors.email)}
          fullWidth
          helperText={errors.email && errors.email.message}
          inputRef={register}
          label="Email Address"
          name="email"
          required
        />
        <TextField
          autoComplete="current-password"
          error={!!(errors.password)}
          fullWidth
          helperText={errors.password && errors.password.message}
          id="password"
          inputRef={register}
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
  );
}

export default SignIn;
