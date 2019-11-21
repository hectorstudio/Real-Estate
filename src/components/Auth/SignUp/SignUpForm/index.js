import React, { useState } from 'react';
import { Button, Grid, Snackbar, Typography } from '@material-ui/core';
import useForm from 'react-hook-form';

import { ROUTES } from '../../../../constants';
import { createUserWithEmailAndPassword } from '../../../../actions/firebase';
import { addNewUser } from '../../../../actions/users';

import Link from '../../../UI/Link';
import TextField from '../../../UI/TextField';

import s from './index.module.scss';

function SignUpForm(props) {
  const { errors, handleSubmit, register } = useForm();
  const [errorMessage, setErrorMessage] = useState();

  const onSubmit = (values) => {
    const { email, password } = values;

    createUserWithEmailAndPassword(email, password)
      .then((res) => {
        const { _password, ...valuesWithoutPassword } = values;
        const newUserData = {
          ...valuesWithoutPassword,
          firebaseId: res.user.uid,
        };

        addNewUser(newUserData).then((data) => {
          res.user.sendEmailVerification();
          props.onEmailSubmit(res.user);
        });
      })
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
          autoComplete="new-password"
          error={!!(errors && errors.password)}
          fullWidth
          inputRef={register({ required: true })}
          label="Password"
          name="password"
          required
          type="password"
        />
        <TextField
          autoComplete="new-password"
          fullWidth
          label="Confirm password"
          name="repassword"
          required
          type="password"
          inputRef={register()}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              className={s.firstName}
              inputRef={register({ required: true })}
              label="First name"
              name="firstName"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="family-name"
              className={s.lastName}
              inputRef={register({ required: true })}
              label="Last name"
              name="lastName"
              required
            />
          </Grid>
        </Grid>
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
          <Typography className={s.link} variant="body2">
            {'Already have an account? '}
            <Link to={ROUTES.signIn()}>
              Sign in
            </Link>
          </Typography>
        </Grid>
      </form>
    </>
  )
}

export default SignUpForm;
