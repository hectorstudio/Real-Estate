import React from 'react';
import { Button, Grid } from '@material-ui/core';
import useForm from 'react-hook-form';

import { ROUTES } from '../../../constants';

import AuthHeader from '../AuthHeader';
import Link from '../../UI/Link';
import TextField from '../../UI/TextField';

import s from './index.module.scss';

function SignIn() {
  const { errors, handleSubmit, register } = useForm();

  const onSubmit = data => {
    console.log(data);
  }

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
            to="#"
          >
            Forgot password?
          </Link>
          <Link
            className={s.link}
            to={ROUTES.signUp()}
          >
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </form>
    </>
  )
}

export default SignIn;
