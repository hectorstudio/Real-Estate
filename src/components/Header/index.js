import React, { useEffect } from 'react';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Search } from '@material-ui/icons';
import clsx from 'clsx';
import {
  AppBar,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Paper,
  Toolbar,
} from '@material-ui/core';

import { ROUTES } from '../../constants';
import { getCurrentUser } from '../../selectors/user';
import { setMessage } from '../../actions/message';
import { signOut } from '../../actions/firebase';

import Link from '../UI/Link';
import Logo from '../../assets/logo3.svg';
import UserAvatar from '../UserAvatar';

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
  searchIcon: {
    color: theme.palette.secondary.main,
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(1),
    transform: 'translateY(2px)',
  },
  searchInput: {
    padding: theme.spacing(0.5),
    width: 400,
  },
  searchInputWrapper: {
    marginLeft: theme.spacing(6),
  },
}));

function Header() {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [shadowVisible, setShadowVisible] = React.useState(false);

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
    dispatch(push(ROUTES.profile.main()));
  };

  const help = () => {
    handleClose();
    dispatch(setMessage('Not implemented yet.'));
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
          <Paper className={classes.searchInputWrapper}>
            <InputBase
              className={classes.searchInput}
              placeholder="Search"
              startAdornment={(
                <div className={classes.searchIcon}>
                  <Search />
                </div>
              )}
            />
          </Paper>
        </div>
        <IconButton
          aria-controls="menu-appbar"
          aria-haspopup="true"
          aria-label="account of current user"
          color="inherit"
          onClick={handleMenu}
          size="small"
        >
          <UserAvatar user={currentUser} />
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
          <MenuItem onClick={help}>Help</MenuItem>
          <MenuItem onClick={logOut}>Sign out</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
