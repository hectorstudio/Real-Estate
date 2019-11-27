import React from 'react';
import useForm from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Grid } from '@material-ui/core';

import { getCurrentUser } from '../../../selectors/user';
import { getFirebaseErrorMessage } from '../../../helpers';
import { reAuthenticateWithEmailAndPassword, updatePassword } from '../../../actions/firebase';
import { setMessage } from '../../../actions/message';

import TextField from '../../UI/TextField';

import s from './index.module.scss';

function SecurityForm() {
  const dispatch = useDispatch();
  const user = useSelector(getCurrentUser);
  const {
    errors,
    handleSubmit,
    register,
    setError,
  } = useForm();

  const onSubmit = async (values) => {
    if (values.newPassword !== values.confirmPassword) {
      setError('confirmPassword', 'notMatch', 'Passwords do not match');
      return Promise.resolve();
    }

    return reAuthenticateWithEmailAndPassword(user.email, values.oldPassword)
      .then(() => {
        updatePassword(values.newPassword);
        dispatch(setMessage('Password has been changed'));
      })
      .catch((error) => {
        setError('oldPassword', 'reAuthenticateError', getFirebaseErrorMessage(error));
      });
  };

  React.useEffect(() => {
    register({ name: 'oldPassword', required: true });
    register({ name: 'newPassword', required: true });
    register({ name: 'confirmPassword', required: true });
  }, [register]);

  return (
    <>
      <form
        className={s.form}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid
          container
          direction="column"
        >
          <Grid item>
            <TextField
              autoComplete="password"
              error={!!(errors && errors.oldPassword)}
              helperText={errors.oldPassword && errors.oldPassword.message}
              inputRef={register}
              label="Current password"
              name="oldPassword"
              required
              type="password"
              variant="standard"
            />
          </Grid>
          <Grid container>
            <Grid item>
              <TextField
                autoComplete="new-password"
                error={!!(errors && errors.newPassword)}
                inputRef={register}
                label="New password"
                name="newPassword"
                required
                type="password"
                variant="standard"
              />
            </Grid>
            <Grid className={s.confirmPassword} item>
              <TextField
                autoComplete="new-password"
                error={!!(errors.confirmPassword)}
                helperText={errors.confirmPassword && errors.confirmPassword.message}
                inputRef={register}
                label="Confirm password"
                name="confirmPassword"
                required
                type="password"
                variant="standard"
              />
            </Grid>
          </Grid>
        </Grid>
        <Button
          className={s.submit}
          color="primary"
          type="submit"
          variant="contained"
        >
          Change password
        </Button>
      </form>
    </>
  );
}

export default SecurityForm;
