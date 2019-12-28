import React from 'react';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Grid } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import countries from '../../../constants/countries';
import profileForm from '../../../constants/validation/profileForm';
import { countryToFlag } from '../../../helpers';
import { getCurrentUser } from '../../../selectors/user';
import { updateUser } from '../../../actions/users';

import TextField from '../../UI/TextField';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: '1',
    width: '50%',
  },
  root: {
    '@global': {
      '.MuiFormControl-root': {
        width: '100%',
      },
    },
  },
  submit: {
    marginTop: theme.spacing(3),
  },
}));

function ProfileForm() {
  const s = useStyles();
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
    if (user.jobTitle !== values.jobTitle) updatedValues.jobTitle = values.jobTitle;
    if (user.companyName !== values.companyName) updatedValues.companyName = values.companyName;

    dispatch(updateUser(updatedValues));
  };

  const onCountryChange = (e, value) => setValue('country', value.code);

  React.useEffect(() => {
    register({ name: 'address' });
    register({ name: 'companyName' });
    register({ name: 'country' });
    register({ name: 'firstName' });
    register({ name: 'jobTitle' });
    register({ name: 'lastName' });
    register({ name: 'phone' });
  }, [register]);

  const rowSpacing = 4;

  return (
    <form
      className={s.root}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid
        container
        direction="column"
        spacing={2}
      >
        <Grid
          container
          item
          spacing={rowSpacing}
        >
          <Grid className={s.grow} item>
            <TextField
              disabled
              label="Email Address"
              required
              value={user.email}
              variant="standard"
            />
          </Grid>
          <Grid className={s.grow} item />
        </Grid>
        <Grid
          container
          item
          spacing={rowSpacing}
        >
          <Grid className={s.grow} item>
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
          <Grid className={s.grow} item>
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
        <Grid
          container
          item
          spacing={rowSpacing}
        >
          <Grid className={s.grow} item>
            <TextField
              defaultValue={user.jobTitle}
              inputRef={register}
              label="Job title"
              name="jobTitle"
              variant="standard"
            />
          </Grid>
          <Grid className={s.grow} item>
            <TextField
              defaultValue={user.companyName}
              inputRef={register}
              label="Company name"
              name="companyName"
              variant="standard"
            />
          </Grid>
        </Grid>
        <Grid
          container
          item
          spacing={rowSpacing}
        >
          <Grid className={s.grow} item>
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
          <Grid className={s.grow} item />
        </Grid>
        <Grid
          container
          item
          spacing={rowSpacing}
        >
          <Grid className={s.grow} item>
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
          <Grid className={s.grow} item>
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
