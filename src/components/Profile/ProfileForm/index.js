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

function ProfileForm() {
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
            autoComplete="email"
            disabled
            error={!!(errors && errors.email)}
            label="Email Address"
            required
            value={user.email}
            variant="standard"
          />
        </Grid>
        <Grid container>
          <Grid item>
            <TextField
              autoComplete="given-name"
              defaultValue={user.firstName}
              error={!!(errors && errors.firstName)}
              inputRef={register({ required: true })}
              label="First name"
              name="firstName"
              required
              variant="standard"
            />
          </Grid>
          <Grid className={s.familyName} item>
            <TextField
              autoComplete="family-name"
              defaultValue={user.lastName}
              error={!!(errors && errors.lastName)}
              inputRef={register({ required: true })}
              label="Last name"
              name="lastName"
              required
              variant="standard"
            />
          </Grid>
        </Grid>
        <Grid item>
          <TextField
            autoComplete="tel"
            defaultValue={user.phone}
            error={!!(errors && errors.phone)}
            inputRef={register({ required: true })}
            label="Phone number"
            name="phone"
            variant="standard"
          />
        </Grid>
        <Grid container>
          <Grid item>
            <TextField
              autoComplete="address"
              defaultValue={user.address}
              error={!!(errors && errors.firstName)}
              inputRef={register({ required: true })}
              label="Address"
              multiline
              name="address"
              variant="standard"
            />
          </Grid>
          <Grid className={s.familyName} item>
            <FormControl className={s.country} margin="normal">
              <InputLabel id="demo-simple-select-helper-label">Country</InputLabel>
              <Select
                id="demo-simple-select"
                inputRef={register({ required: true })}
                labelId="demo-simple-select-label"
                name="country"
                value="us"
              >
                <MenuItem value="us">United States</MenuItem>
                <MenuItem value="uk">United Kingdom</MenuItem>
                <MenuItem value="pl">Poland</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Button
        className={s.submit}
        color="primary"
        type="submit"
        variant="contained"
      >
        Save changes
      </Button>
    </form>
  );
}

export default ProfileForm;
