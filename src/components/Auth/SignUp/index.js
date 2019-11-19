import React from 'react';
import { TextField, Button, Grid } from '@material-ui/core';

import s from './index.module.scss';
import AuthHeader from '../AuthHeader';
import Link from '../../UI/Link';
import { ROUTES } from '../../../constants';

function SignUp() {
  return (
    <>
      <AuthHeader title="Sign up" />
      <form className={s.form} noValidate>
        <TextField
          autoComplete="given-name"
          autoFocus
          fullWidth
          id="email"
          label="First name"
          margin="normal"
          name="firstName"
          required
          variant="outlined"
        />
        <TextField
          autoComplete="family-name"
          fullWidth
          id="email"
          label="Last name"
          margin="normal"
          name="lastName"
          required
          variant="outlined"
        />
        <TextField
          autoComplete="email"
          fullWidth
          id="email"
          label="Email Address"
          margin="normal"
          name="email"
          required
          variant="outlined"
        />
        <TextField
          autoComplete="new-password"
          fullWidth
          id="password"
          label="Password"
          margin="normal"
          name="password"
          required
          type="password"
          variant="outlined"
        />
        <TextField
          autoComplete="new-password"
          fullWidth
          id="repassword"
          label="Confirm password"
          margin="normal"
          name="repassword"
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
          Sign up
        </Button>
        <Grid className={s.linkContainer}>
          <Link
            className={s.link}
            to={ROUTES.signIn()}
          >
            {"Already have an account? Sign in"}
          </Link>
        </Grid>
      </form>
    </>
  )
}

export default SignUp;
