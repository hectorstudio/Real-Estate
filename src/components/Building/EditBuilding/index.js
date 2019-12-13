import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Autocomplete } from '@material-ui/lab';
import useForm from 'react-hook-form';
import { push } from 'connected-react-router';
import {
  Button,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
} from '@material-ui/core';

import countries from '../../../constants/countries';
import { ROUTES, ROLES } from '../../../constants';
import { countryToFlag } from '../../../helpers';
import { getBuildingById, getBuildingPermissionByBuildingIdAndUserId } from '../../../selectors/buildings';
import { getCurrentBuildingId } from '../../../selectors/router';
import { setMessage } from '../../../actions/message';
import { updateBuilding } from '../../../actions/buildings';
import { getCurrentUser } from '../../../selectors/user';

import s from './index.module.scss';

function EditBuilding() {
  const dispatch = useDispatch();
  const currentBuildingId = useSelector(getCurrentBuildingId);
  const building = useSelector((state) => getBuildingById(state, currentBuildingId)) || {};
  const user = useSelector(getCurrentUser);
  const permission = useSelector((state) => getBuildingPermissionByBuildingIdAndUserId(state, currentBuildingId, user.id)) || {};
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

  // FIXME: Default values when refreshing page
  useEffect(() => {
    register({ name: 'name' });
    register({ name: 'company' });
    register({ name: 'city' });
    register({ name: 'address' });
    register({ name: 'country' });
  }, [register]);

  useEffect(() => {
    if (building && permission.role !== ROLES.ADMIN) dispatch(push(ROUTES.building.main(currentBuildingId)));
  }, [building, currentBuildingId, dispatch, permission.role]);

  return (
    <div className={s.root}>
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
          <Grid item>
            <FormControlLabel
              control={(
                <Switch
                  checked={false}
                  color="primary"
                  disabled
                  onChange={() => {}}
                  value="public"
                />
              )}
              label="Visible to the public"
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
