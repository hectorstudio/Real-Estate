import React from 'react';
import useForm from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Button, Grid } from '@material-ui/core';

import { getCurrentUser } from '../../../selectors/user';
import { getFirebaseErrorMessage } from '../../../helpers';
import { reAuthenticateWithEmailAndPassword, updatePassword } from '../../../actions/firebase';
import { setMessage } from '../../../actions/message';

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

function SecurityForm() {
  const s = useStyles();
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
          <Grid className={s.grow} item />
        </Grid>
        <Grid
          container
          item
          spacing={rowSpacing}
        >
          <Grid className={s.grow} item>
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
          <Grid className={s.grow} item>
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
  );
}

export default SecurityForm;
