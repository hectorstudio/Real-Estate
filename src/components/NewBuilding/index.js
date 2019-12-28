import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, TextField, Grid } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useForm } from 'react-hook-form';
import { push } from 'connected-react-router';

import countries from '../../constants/countries';
import newBuilding from '../../constants/validation/newBuilding';
import { ROUTES } from '../../constants';
import { addNewBuilding } from '../../actions/buildings';
import { countryToFlag } from '../../helpers';
import { setMessage } from '../../actions/message';

import Container from '../UI/Container';

import s from './index.module.scss';

function NewBuilding() {
  const dispatch = useDispatch();
  const {
    errors,
    handleSubmit,
    register,
    setValue,
  } = useForm({
    validationSchema: newBuilding,
  });

  const onSubmit = (values) => {
    addNewBuilding(values).then(() => {
      dispatch(setMessage('New building has been added'));
      dispatch(push(ROUTES.home()));
    }).catch((err) => {
      dispatch(setMessage('There was an error when adding new building. Please try again later.'));
      console.error(err);
    });
  };

  const onCountryChange = (e, value) => setValue('country', value.code);

  React.useEffect(() => {
    register({ name: 'name' });
    register({ name: 'company' });
    register({ name: 'city' });
    register({ name: 'address' });
    register({ name: 'country' });
  }, [register]);

  return (
    <Container maxWidth="lg">
      <div className={s.root}>
        <Button
          color="secondary"
          onClick={() => dispatch(push(ROUTES.home()))}
          type="submit"
          variant="outlined"
        >
          Go back
        </Button>
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
                error={!!(errors.name)}
                inputRef={register}
                label="Building name"
                name="name"
                required
                variant="standard"
              />
            </Grid>
            <Grid item>
              <TextField
                error={!!(errors.name)}
                inputRef={register}
                label="Company"
                name="company"
                required
                variant="standard"
              />
            </Grid>
            <Grid item>
              <TextField
                error={!!(errors.name)}
                inputRef={register}
                label="Address"
                name="address"
                required
                variant="standard"
              />
            </Grid>
            <Grid item>
              <TextField
                error={!!(errors.city)}
                inputRef={register}
                label="City"
                name="city"
                required
                variant="standard"
              />
            </Grid>
            <Grid item>
              <Autocomplete
                autoHighlight
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
          <Button
            className={s.submit}
            color="primary"
            type="submit"
            variant="contained"
          >
            Add new building
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default NewBuilding;
