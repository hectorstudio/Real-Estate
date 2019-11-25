import React from 'react';
import useForm from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';

import { getCurrentUser } from '../../../selectors/user';

import TextField from '../../UI/TextField';

import s from './index.module.scss';
import { updateUser } from '../../../actions/users';

function SecurityForm() {
  const dispatch = useDispatch();
  const user = useSelector(getCurrentUser);
  const { errors, handleSubmit, register } = useForm();

  const onSubmit = (values) => {
    const updatedValues = {};

    if (user.firstName !== values.firstName) updatedValues.firstName = values.firstName;
    if (user.lastName !== values.lastName) updatedValues.lastName = values.lastName;
    if (user.phone !== values.phone) updatedValues.phone = values.phone;
    if (user.address !== values.address) updatedValues.address = values.address;
    if (user.country !== values.country) updatedValues.country = values.country;

    dispatch(updateUser(updatedValues));
  };

  return (
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
            inputRef={register({ required: true })}
            label="Current password"
            name="oldPassword"
            required
            variant="standard"
          />
        </Grid>
        <Grid container>
          <Grid item>
            <TextField
              autoComplete="new-password"
              error={!!(errors && errors.newPassword)}
              inputRef={register({ required: true })}
              label="New password"
              name="newPassword"
              required
              variant="standard"
            />
          </Grid>
          <Grid className={s.confirmPassword} item>
            <TextField
              autoComplete="new-password"
              error={!!(errors && errors.confirmPassword)}
              inputRef={register({ required: true })}
              label="Confirm password"
              name="confirmPassword"
              required
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
  );
}

export default SecurityForm;
