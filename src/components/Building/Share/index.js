import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  Breadcrumbs,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Select,
  Typography,
  TextField,
  Button,
  ListSubheader,
  Grid,
  IconButton,
  Icon,
} from '@material-ui/core';
import useForm from 'react-hook-form';

import Link from '../../UI/Link';
import { getCurrentBuildingId } from '../../../selectors/router';
import { ROUTES, ROLES } from '../../../constants';
import { getBuildingById, getBuildingPermissionsByBuildingId } from '../../../selectors/buildings';
import { getUsers } from '../../../selectors/users';
import { updateBuildingPermission, addBuildingPermission, deleteBuildingPermission } from '../../../actions/buildings';
import { setMessage } from '../../../actions/message';
import inviteUser from '../../../constants/validation/inviteUser';
import { getCurrentUser } from '../../../selectors/user';

const useStyles = makeStyles((theme) => ({
  breadcrumbs: {
    transform: `translate(-${theme.spacing(1)}px, -${theme.spacing(3)}px)`,
  },
  deleteIcon: {
    marginLeft: theme.spacing(1),
  },
  invitedSubheader: {
    marginBottom: theme.spacing(2),
  },
  inviteForm: {
    marginBottom: theme.spacing(6),
  },
  inviteSelect: {
    marginTop: theme.spacing(1),
  },
  list: {
    maxWidth: 400,
  },
  submitItem: {
    marginTop: theme.spacing(4),
  },
  textField: {
    width: 200,
  },
}));

function Share() {
  const dispatch = useDispatch();
  const currentBuildingId = useSelector(getCurrentBuildingId);
  const currentUser = useSelector(getCurrentUser);
  const building = useSelector((state) => getBuildingById(state, currentBuildingId));
  const permissions = useSelector((state) => getBuildingPermissionsByBuildingId(state, currentBuildingId));
  const users = useSelector(getUsers);

  const {
    errors,
    handleSubmit,
    register,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      role: ROLES.VIEWER,
    },
    validationSchema: inviteUser,
  });

  const s = useStyles();

  const onChangeExistingPermission = useCallback((permissionId, buildingId, userId) => (e) => {
    const newRole = e.target.value;

    dispatch(updateBuildingPermission(permissionId, currentBuildingId, userId, newRole)).then(() => {
      dispatch(setMessage('Role has been changed.'));
    });
  }, [currentBuildingId, dispatch]);

  const onChangeInvitePermissions = useCallback((e) => {
    setValue('role', e.target.value);
  }, [setValue]);

  const onSubmit = (values) => {
    const { email, role } = values;
    dispatch(addBuildingPermission(currentBuildingId, email, role)).then(() => {
      dispatch(setMessage('User has been invited.'));
      reset();
    });
  };

  const deletePermission = (userId, permissionId) => () => {
    dispatch(deleteBuildingPermission(currentBuildingId, userId, permissionId)).then(() => {
      dispatch(setMessage('User permissions have been revoked.'));
    });
  };

  useEffect(() => {
    register({ name: 'email' });
    register({ name: 'role' });
  }, [register]);

  return (
    <div>
      {building && (
        <Breadcrumbs aria-label="breadcrumb" className={s.breadcrumbs}>
          <Link color="inherit" to={ROUTES.building.main(currentBuildingId)}>
            {building.name}
          </Link>
          <Typography color="textPrimary">Permissions</Typography>
        </Breadcrumbs>
      )}
      <List className={s.list}>
        <ListSubheader>
          <Typography variant="h6">Invite</Typography>
        </ListSubheader>
        <form
          className={s.inviteForm}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <ListItem>
            <ListItemText>
              <TextField
                classes={{
                  root: s.textField,
                }}
                error={!!(errors.email)}
                inputRef={register}
                label="Email"
                name="email"
                required
                variant="standard"
              />
            </ListItemText>
            <ListItemSecondaryAction className={s.inviteSelect}>
              <Select
                defaultValue={ROLES.VIEWER}
                displayEmpty
                error={!!(errors.role)}
                inputRef={register}
                name="role"
                onChange={onChangeInvitePermissions}
              >
                <MenuItem value={ROLES.VIEWER}>Viewer</MenuItem>
                <MenuItem value={ROLES.CONTRIBUTOR}>Contributor</MenuItem>
                <MenuItem value={ROLES.Editor}>Editor</MenuItem>
                <MenuItem value={ROLES.ADMIN}>Admin</MenuItem>
              </Select>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem className={s.submitItem}>
            <ListItemSecondaryAction>
              <Button
                className={s.submit}
                color="primary"
                type="submit"
                variant="contained"
              >
                Invite user
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        </form>
        <ListSubheader className={s.invitedSubheader}>
          <Typography variant="h6">People</Typography>
        </ListSubheader>
        {permissions.map((item) => {
          const user = users.find((u) => u.id === item.userId);
          return (
            <ListItem key={item.id}>
              <ListItemAvatar>
                <Avatar>{`${user.firstName.slice(0, 1)}${user.lastName.slice(0, 1)}`}</Avatar>
              </ListItemAvatar>
              <ListItemText>
                {`${user.firstName} ${user.lastName}`}
              </ListItemText>
              <ListItemSecondaryAction>
                <Grid container>
                  <Grid item>
                    <Select
                      displayEmpty
                      onChange={onChangeExistingPermission(item.id, item.contentId, item.userId)}
                      value={item.role}
                    >
                      <MenuItem value={ROLES.VIEWER}>Viewer</MenuItem>
                      <MenuItem value={ROLES.CONTRIBUTOR}>Contributor</MenuItem>
                      <MenuItem value={ROLES.Editor}>Editor</MenuItem>
                      <MenuItem value={ROLES.ADMIN}>Admin</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item>
                    <IconButton
                      className={s.deleteIcon}
                      disabled={item.userId === currentUser.id}
                      onClick={deletePermission(item.userId, item.id)}
                      size="small"
                    >
                      <Icon>close</Icon>
                    </IconButton>
                  </Grid>
                </Grid>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

export default Share;
