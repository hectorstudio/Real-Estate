import React from 'react';
import { push } from 'connected-react-router';

import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from '@material-ui/core';
import { Menu as MenuIcon, AccountCircle } from '@material-ui/icons';

import s from './index.module.scss';
import { useDispatch } from 'react-redux';
import { ROUTES } from '../../constants';
import { signOut } from '../../actions/firebase';

function Header() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = event => {
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
  }

  const profile = () => {
    handleClose();
    dispatch(push(ROUTES.profile()));
  }

  return (
    <div className={s.root}>
      <AppBar
        className={s.header}
        position="static"
      >
        <Toolbar>
          <IconButton edge="start" className={s.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={s.title}>
            News
          </Typography>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={!!anchorEl}
            onClose={handleClose}
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
