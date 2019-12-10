import React from 'react';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
import { AccountCircle } from '@material-ui/icons';
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Typography,
} from '@material-ui/core';

import { ROUTES } from '../../constants';
import { signOut } from '../../actions/firebase';
import { getCurrentBuildingId } from '../../selectors/router';
import { getBuildingById } from '../../selectors/buildings';

import Logo from '../../assets/logo3.svg';
import Link from '../UI/Link';

import s from './index.module.scss';

function Header() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const currentBuildingId = useSelector(getCurrentBuildingId);
  const currentBuilding = useSelector((state) => getBuildingById(state, currentBuildingId));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    handleClose();
    signOut().then(() => {
      dispatch(push(ROUTES.home()));
      window.location.reload();
    });
  };

  const profile = () => {
    handleClose();
    dispatch(push(ROUTES.profile()));
  };

  return (
    <div className={s.root}>
      <AppBar
        className={s.header}
        position="static"
      >
        <Toolbar>
          <div className={s.logoWrapper}>
            <Link to={ROUTES.home()}>
              <img alt="Pocket Buildings" className={s.logo} src={Logo} />
            </Link>
            {currentBuilding && (
              <>
                <Divider className={s.divider} orientation="vertical" />
                <Typography variant="body1">{currentBuilding.name}</Typography>
                <Link className={s.edit} to={ROUTES.building.edit(currentBuildingId)}>Edit</Link>
              </>
            )}
          </div>
          <IconButton
            aria-controls="menu-appbar"
            aria-haspopup="true"
            aria-label="account of current user"
            color="inherit"
            onClick={handleMenu}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              horizontal: 'right',
              vertical: 'top',
            }}
            className={s.menu}
            id="menu-appbar"
            keepMounted
            onClose={handleClose}
            open={!!anchorEl}
            transformOrigin={{
              horizontal: 'right',
              vertical: 'bottom',
            }}
          >
            <MenuItem onClick={profile}>Profile</MenuItem>
            <MenuItem onClick={logOut}>Sign out</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
