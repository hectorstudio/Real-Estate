import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

import LinkButton from '../LinkButton';

const useStyles = makeStyles((theme) => ({
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

  return (
    <Drawer
      classes={{
        paper: s.drawerPaper,
      }}
      variant="permanent"
    >
      <div className={s.toolbar} />
      <List className={s.list}>
        {props.items.map((item) => (
          <ListItem
            component={LinkButton}
            key={item.to}
            to={item.to}
          >
            {item.icon && (
              <ListItemIcon className={s.icon}><Icon>{item.icon}</Icon></ListItemIcon>
            )}
            <ListItemText>{item.label}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

Sidebar.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Sidebar;
