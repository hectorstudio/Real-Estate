import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button, Grid, Typography } from '@material-ui/core';

import signUpForm from '../../../../constants/validation/signUpForm';
import { ROUTES } from '../../../../constants';
import { addNewUser } from '../../../../actions/users';
import { createUserWithEmailAndPassword, sendEmailVerification } from '../../../../actions/firebase';
import { setMessage } from '../../../../actions/message';

import Link from '../../../UI/Link';
import TextField from '../../../UI/TextField';

import s from './index.module.scss';

function SignUpForm(props) {
  const dispatch = useDispatch();
  const {
    errors,
    handleSubmit,
    setError,
    register,
  } = useForm({
    validationSchema: signUpForm,
  });

  const onSubmit = (values) => {
    const { email, password } = values;

    if (values.password !== values.rePassword) {
      setError('rePassword', 'notMatch', 'Passwords do not match');
      return Promise.resolve();
    }

    return createUserWithEmailAndPassword(email, password)
      .then((res) => {
        const {
          password: _password,
          rePassword: _rePassword,
          ...valuesWithoutPassword
        } = values;
        const newUserData = {
          ...valuesWithoutPassword,
          firebaseId: res.user.uid,
        };

        addNewUser(newUserData).then(() => {
          res.user.sendEmailVerification();
          props.onEmailSubmit(res.user);
        });

        sendEmailVerification();
      })
      .catch((err) => dispatch(setMessage(err.message)));
  };

  return (
    <>
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
          autoComplete="new-password"
          error={!!(errors.password)}
          fullWidth
          helperText={errors.password && errors.password.message}
          inputRef={register}
          label="Password"
          name="password"
          required
          type="password"
        />
        <TextField
          autoComplete="new-password"
          error={!!(errors.rePassword)}
          fullWidth
          helperText={errors.rePassword && errors.rePassword.message}
          inputRef={register}
          label="Confirm password"
          name="rePassword"
          required
          type="password"
        />
        <Grid container spacing={2}>
          <Grid item sm={6} xs={12}>
            <TextField
              autoComplete="given-name"
              className={s.firstName}
              error={!!(errors.firstName)}
              helperText={errors.firstName && errors.firstName.message}
              inputRef={register}
              label="First name"
              name="firstName"
              required
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              autoComplete="family-name"
              className={s.lastName}
              error={!!(errors.lastName)}
              helperText={errors.lastName && errors.lastName.message}
              inputRef={register}
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
  );
}

SignUpForm.propTypes = {
  onEmailSubmit: PropTypes.func.isRequired,
};

export default SignUpForm;
