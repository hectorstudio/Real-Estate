import React, { useEffect } from 'react';
import useForm from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Grid, Typography } from '@material-ui/core';
import { push } from 'connected-react-router';

import AuthHeader from '../AuthHeader';
import Link from '../../UI/Link';
import { ROUTES } from '../../../constants';
import { getFirebaseErrorMessage } from '../../../helpers';
import { applyActionCode, updatePassword } from '../../../actions/firebase';
import { getQuery } from '../../../selectors/router';

import TextField from '../../UI/TextField';

import s from './index.module.scss';

function PasswordReset() {
  const dispatch = useDispatch();
  const params = useSelector(getQuery);
  const {
    errors,
    handleSubmit,
    register,
    setError,
  } = useForm();

  useEffect(() => {
    if (!params.oobCode) {
      dispatch(push(ROUTES.signIn));
    }
  }, [dispatch, params.oobCode]);

  const onSubmit = async (values) => {
    if (values.newPassword !== values.confirmPassword) {
      setError('confirmPassword', 'notMatch', 'Passwords do not match');
      return Promise.resolve();
    }

    return applyActionCode(params.oobCode)
      .then(() => {
        updatePassword(values.newPassword);
        dispatch(push(ROUTES.signIn));
      })
      .catch((error) => {
        setError('oldPassword', 'reAuthenticateError', getFirebaseErrorMessage(error));
      });
  };

  React.useEffect(() => {
    register({ name: 'newPassword', required: true });
    register({ name: 'confirmPassword', required: true });
  }, [register]);

  return (
    <>
      <AuthHeader title="Reset password" />
      <form
        className={s.form}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          autoComplete="new-password"
          error={!!(errors.newPassword)}
          fullWidth
          inputRef={register}
          label="New password"
          name="newPassword"
          required
          type="password"
        />
        <TextField
          autoComplete="new-password"
          error={!!(errors.confirmPassword)}
          fullWidth
          helperText={errors.confirmPassword && errors.confirmPassword.message}
          inputRef={register}
          label="Confirm password"
          name="confirmPassword"
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
          Change password
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
  );
}

export default PasswordReset;
