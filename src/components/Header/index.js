import React, { useEffect } from 'react';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { AccountCircle } from '@material-ui/icons';
import clsx from 'clsx';
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

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: theme.palette.background.paper,
    boxShadow: 'none',
    color: theme.palette.text.primary,
    zIndex: theme.zIndex.drawer + 1,
  },
  appBarWithShadow: {
    boxShadow: '0 2px 5px rgba(200, 200, 200, .2)',
  },
}));

function Header() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [shadowVisible, setShadowVisible] = React.useState(false);

  const currentBuildingId = useSelector(getCurrentBuildingId);
  const currentBuilding = useSelector((state) => getBuildingById(state, currentBuildingId));

  const classes = useStyles();

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

  useEffect(() => {
    const onScroll = () => {
      const scrollThreshold = 20;
      if (window.scrollY > scrollThreshold && !shadowVisible) {
        setShadowVisible(true);
      } else
      if (window.scrollY <= scrollThreshold && shadowVisible) {
        setShadowVisible(false);
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [shadowVisible]);

  return (
    <AppBar
      className={clsx(classes.appBar, { [classes.appBarWithShadow]: shadowVisible })}
      position="fixed"
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
  );
}

export default Header;
