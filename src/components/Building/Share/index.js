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
} from '@material-ui/core';
import useForm from 'react-hook-form';

import Link from '../../UI/Link';
import { getCurrentBuildingId } from '../../../selectors/router';
import { ROUTES, ROLES } from '../../../constants';
import { getBuildingById, getBuildingPermissionsByBuildingId } from '../../../selectors/buildings';
import { getUsers } from '../../../selectors/users';
import { updateBuildingPermission } from '../../../actions/buildings';
import { setMessage } from '../../../actions/message';
import inviteUser from '../../../constants/validation/inviteUser';

const useStyles = makeStyles((theme) => ({
  breadcrumbs: {
    transform: `translate(-${theme.spacing(1)}px, -${theme.spacing(3)}px)`,
  },
  inviteSelect: {
    marginTop: theme.spacing(1),
  },
  inviteSubheader: {
    marginTop: theme.spacing(5),
  },
  list: {
    maxWidth: 400,
  },
  submitItem: {
    marginTop: theme.spacing(4),
  },
}));

function Share() {
  const dispatch = useDispatch();
  const currentBuildingId = useSelector(getCurrentBuildingId);
  const building = useSelector((state) => getBuildingById(state, currentBuildingId));
  const permissions = useSelector((state) => getBuildingPermissionsByBuildingId(state, currentBuildingId));
  const users = useSelector(getUsers);

  const {
    errors,
    handleSubmit,
    register,
    setValue,
  } = useForm({
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
    console.log('OK');
    setValue('role', e.target.value);
  }, [setValue]);

  const onSubmit = () => {};

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
                <Select
                  displayEmpty
                  onChange={onChangeExistingPermission(item.id, item.contentId, item.userId)}
                  value={item.role}
                >
                  <MenuItem value="ADMIN">Admin</MenuItem>
                  <MenuItem value="VIEWER">Viewer</MenuItem>
                </Select>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
        <ListSubheader className={s.inviteSubheader}>
          <Typography variant="h6">Invite</Typography>
        </ListSubheader>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <ListItem className={s}>
            <ListItemText>
              <TextField
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
                <MenuItem value={ROLES.ADMIN}>Admin</MenuItem>
                <MenuItem value={ROLES.VIEWER}>Viewer</MenuItem>
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
      </List>
    </div>
  );
}

export default Share;
