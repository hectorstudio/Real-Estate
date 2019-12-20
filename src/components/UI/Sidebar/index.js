import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { matchPath } from 'react-router';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import {
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

import { getPathname } from '../../../selectors/router';

import LinkButton from '../LinkButton';
import LayoutPaper from '../LayoutPaper';

const useStyles = makeStyles(/* istanbul ignore next */(theme) => ({
  activeItem: {
    color: theme.palette.primary.main,
  },
  drawerPaper: {
    borderRight: 0,
    padding: 0,
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
    <LayoutPaper className={clsx(s.drawerPaper, props.className)}>
      <List className={s.list}>
        {items.map((item) => (
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
        ))}
      </List>
    </LayoutPaper>
  );
}

Sidebar.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string,
    label: PropTypes.string,
    to: PropTypes.string,
  })).isRequired,
};

Sidebar.defaultProps = {
  className: '',
};

export default Sidebar;
