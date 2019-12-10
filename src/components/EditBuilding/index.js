import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, Grid } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import useForm from 'react-hook-form';
import { push } from 'connected-react-router';

import countries from '../../constants/countries';
import { ROUTES } from '../../constants';
import { updateBuilding } from '../../actions/buildings';
import { countryToFlag } from '../../helpers';
import { getCurrentBuildingId } from '../../selectors/router';
import { setMessage } from '../../actions/message';

import s from './index.module.scss';
import { getBuildingById } from '../../selectors/buildings';

function EditBuilding() {
  const dispatch = useDispatch();
  const currentBuildingId = useSelector(getCurrentBuildingId);
  const building = useSelector((state) => getBuildingById(state, currentBuildingId)) || {};
  const {
    errors,
    handleSubmit,
    register,
    setValue,
  } = useForm({
    // TODO:
    // validationSchema: newBuilding,
  });

  const onSubmit = (values) => {
    const updatedValues = {};

    if (building.name !== values.name) updatedValues.name = values.name;
    if (building.company !== values.company) updatedValues.company = values.company;
    if (building.city !== values.city) updatedValues.city = values.city;
    if (building.address !== values.address) updatedValues.address = values.address;
    if (building.country !== values.country) updatedValues.country = values.country;

    dispatch(updateBuilding(currentBuildingId, values)).then(() => {
      dispatch(push(ROUTES.building.main(currentBuildingId)));
      dispatch(setMessage('Building has been updated'));
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
    <div className={s.root}>
      <Button
        color="secondary"
        onClick={() => dispatch(push(ROUTES.building.main(currentBuildingId)))}
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
              defaultValue={building.name}
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
              defaultValue={building.company}
              error={!!(errors.company)}
              inputRef={register}
              label="Company"
              name="company"
              required
              variant="standard"
            />
          </Grid>
          <Grid item>
            <TextField
              defaultValue={building.address}
              error={!!(errors.address)}
              inputRef={register}
              label="Address"
              name="address"
              required
              variant="standard"
            />
          </Grid>
          <Grid item>
            <TextField
              defaultValue={building.city}
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
              defaultValue={countries.find((x) => x.code === building.country)}
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
          Save changes
        </Button>
      </form>
    </div>
  );
}

export default EditBuilding;
