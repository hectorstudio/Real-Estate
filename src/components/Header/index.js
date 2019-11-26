import React from 'react';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { AccountCircle } from '@material-ui/icons';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from '@material-ui/core';

import s from './index.module.scss';
import { ROUTES } from '../../constants';
import { signOut } from '../../actions/firebase';

function Header() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    handleClose();
    signOut();
    dispatch(push(ROUTES.home()));
    window.location.reload();
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
          <Typography className={s.title} variant="h6">
            PocketBuildings
          </Typography>
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
            id="menu-appbar"
            keepMounted
            onClose={handleClose}
            open={!!anchorEl}
            transformOrigin={{
              horizontal: 'right',
              vertical: 'top',
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
