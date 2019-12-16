import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { matchPath } from 'react-router';
import clsx from 'clsx';
import {
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
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
    width: 220,
  },
  icon: {
    minWidth: theme.spacing(5),
  },
}));

function Sidebar(props) {
  const s = useStyles();
  const pathname = useSelector(getPathname);

  const items = props.items.filter((i) => i);

  return (
    <Paper className={s.drawerPaper}>
      <List className={s.list}>
        {items.map((item, i) => (
          <>
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
            {(i + 100 < items.length) && <Divider key={item} variant="middle" />}
          </>
        ))}
      </List>
    </Paper>
  );
}

Sidebar.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Sidebar;
