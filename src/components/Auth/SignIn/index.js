import React from 'react';
import { TextField, Button, Grid } from '@material-ui/core';

import s from './index.module.scss';
import AuthHeader from '../AuthHeader';
import Link from '../../UI/Link';
import { ROUTES } from '../../../constants';

function SignIn() {
  return (
    <>
      <AuthHeader title="Sign in" />
      <form className={s.form} noValidate>
        <TextField
          autoComplete="email"
          autoFocus
          fullWidth
          id="email"
          label="Email Address"
          margin="normal"
          name="email"
          required
          variant="outlined"
        />
        <TextField
          autoComplete="current-password"
          fullWidth
          id="password"
          label="Password"
          margin="normal"
          name="password"
          required
          type="password"
          variant="outlined"
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
