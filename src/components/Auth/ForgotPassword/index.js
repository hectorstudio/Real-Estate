import React, { useState } from 'react';
import useForm from 'react-hook-form';
import { Button, Grid, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import forgotPasswordForm from '../../../constants/validation/forgotPasswordForm';
import { ROUTES } from '../../../constants';
import { getFirebaseErrorMessage } from '../../../helpers';
import { sendPasswordResetEmail } from '../../../actions/firebase';
import { setMessage } from '../../../actions/message';

import AuthHeader from '../AuthHeader';
import AuthSuccess from '../AuthSuccess';
import Link from '../../UI/Link';
import TextField from '../../UI/TextField';

import s from './index.module.scss';

function ForgotPassword() {
  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { errors, handleSubmit, register } = useForm({
    validationSchema: forgotPasswordForm,
  });

  const onSubmit = (values) => {
    const { email } = values;

    sendPasswordResetEmail(email)
      .then(() => {
        setFormSubmitted(true);
      })
      .catch((err) => {
        const message = getFirebaseErrorMessage(err);
        return dispatch(setMessage(message));
      });
  };

  return (
    <>
      <AuthHeader title="Reset password" />
      {formSubmitted
        ? (
          <AuthSuccess
            body={[
              'We sent you an email with a link that will allow you to reset password.',
              'Please click a link or paste it in your browser to change your password.',
            ]}
          />
        )
        : (
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
        )}
    </>
  );
}

export default ForgotPassword;
