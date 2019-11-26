import React from 'react';
import useForm from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Grid } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import profileForm from '../../../constants/validation/profileForm';
import { getCurrentUser } from '../../../selectors/user';
import { updateUser } from '../../../actions/users';
import countries from '../../../constants/countries';

import TextField from '../../UI/TextField';

import s from './index.module.scss';
import { countryToFlag } from '../../../helpers';

function ProfileForm() {
  const dispatch = useDispatch();
  const user = useSelector(getCurrentUser);
  const {
    errors,
    handleSubmit,
    register,
    setValue,
  } = useForm({
    validationSchema: profileForm,
  });

  const onSubmit = (values) => {
    const updatedValues = {};

    if (user.firstName !== values.firstName) updatedValues.firstName = values.firstName;
    if (user.lastName !== values.lastName) updatedValues.lastName = values.lastName;
    if (user.phone !== values.phone) updatedValues.phone = values.phone;
    if (user.address !== values.address) updatedValues.address = values.address;
    if (user.country !== values.country) updatedValues.country = values.country;

    dispatch(updateUser(updatedValues));
  };

  const onCountryChange = (e, value) => setValue('country', value.code);

  React.useEffect(() => {
    register({ name: 'firstName' });
    register({ name: 'lastName' });
    register({ name: 'phone' });
    register({ name: 'address' });
    register({ name: 'country' });
  }, [register]);

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
            disabled
            label="Email Address"
            required
            value={user.email}
            variant="standard"
          />
        </Grid>
        <Grid className={s.groupFields} container>
          <Grid item>
            <TextField
              autoComplete="given-name"
              defaultValue={user.firstName}
              error={!!(errors.firstName)}
              inputRef={register}
              label="First name"
              name="firstName"
              required
              variant="standard"
            />
          </Grid>
          <Grid item>
            <TextField
              autoComplete="family-name"
              defaultValue={user.lastName}
              error={!!(errors.lastName)}
              inputRef={register}
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
            error={!!(errors.phone)}
            helperText={errors.phone && errors.phone.message}
            inputRef={register}
            label="Phone number"
            name="phone"
            variant="standard"
          />
        </Grid>
        <Grid className={s.groupFields} container>
          <Grid item>
            <TextField
              autoComplete="address"
              defaultValue={user.address}
              inputRef={register}
              label="Address"
              multiline
              name="address"
              variant="standard"
            />
          </Grid>
          <Grid item>
            <Autocomplete
              autoHighlight
              defaultValue={countries.find((x) => x.code === user.country)}
              getOptionLabel={(option) => option.label}
              onChange={onCountryChange}
              options={countries}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'disabled', // disable native autocomplete and autofill
                  }}
                  label="Country"
                  variant="standard"
                />
              )}
              renderOption={(option) => (
                <>
                  <span>{countryToFlag(option.code)}</span>
                  {`${option.label} (${option.code})`}
                </>
              )}
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
        Save changes
      </Button>
    </form>
  );
}

export default ProfileForm;
