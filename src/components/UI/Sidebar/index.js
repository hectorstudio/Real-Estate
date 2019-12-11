import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { matchPath } from 'react-router';
import clsx from 'clsx';
import {
  Drawer,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core';

import { useSelector } from 'react-redux';
import { getPathname } from '../../../selectors/router';

import LinkButton from '../LinkButton';

const useStyles = makeStyles((theme) => ({
  activeItem: {
    color: theme.palette.primary.main,
  },
  drawerPaper: {
    borderRight: 0,
    width: 240,
  },
  icon: {
    minWidth: theme.spacing(5),
  },
  list: {
    borderRight: `solid ${theme.palette.divider} 1px`,
    paddingBottom: theme.spacing(3),
    paddingTop: 0,
  },
  toolbar: {
    ...theme.mixins.toolbar,
    marginBottom: theme.spacing(5),
  },
}));

function Sidebar(props) {
  const s = useStyles();
  const pathname = useSelector(getPathname);

  return (
    <Drawer
      classes={{
        paper: s.drawerPaper,
      }}
      variant="permanent"
    >
      <div className={s.toolbar} />
      <List className={s.list}>
        {props.items.filter((i) => i).map((item) => (item === 'divider'
          ? <Divider key={item} variant="middle" />
          : (
            <ListItem
              className={clsx({ [s.activeItem]: matchPath(item.to, pathname)?.isExact })}
              component={LinkButton}
              key={item.to}
              to={item.to}
            >
              {item.icon && (
                <ListItemIcon
                  className={clsx(s.icon, { [s.activeItem]: matchPath(item.to, pathname) ?.isExact })}
                >
                  <Icon>{item.icon}</Icon>
                </ListItemIcon>
              )}
              <ListItemText>{item.label}</ListItemText>
            </ListItem>
          )))}
      </List>
    </Drawer>
  );
}

Sidebar.propTypes = {
  items: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.shape(), PropTypes.string])).isRequired,
};

export default Sidebar;
