import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Grid,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';

import { getCurrentUser } from '../../selectors/user';

import Link from '../UI/Link';
import ProfileForm from './ProfileForm';
import SecurityForm from './SecurityForm';

import s from './index.module.scss';

const pages = {
  personal: 'personal',
  security: 'security',
};

function Profile() {
  const [page, setPage] = useState(pages.personal);
  const user = useSelector(getCurrentUser);

  const changePage = (p) => () => setPage(p);

  let component;
  switch (page) {
    case pages.security:
      component = <SecurityForm />;
      break;
    default:
      component = <ProfileForm />;
  }

  return (
    <div className={s.root}>
      <Typography variant="h5">Preferences</Typography>
      <Grid
        className={s.grid}
        container
      >
        <Grid className={s.menu} item>
          <List className={s.menuList}>
            <ListItem className={s.link}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link
                component="button"
                onClick={changePage(pages.personal)}
                variant="body1"
              >
                Personal information
              </Link>
            </ListItem>
            <ListItem className={s.link}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link
                component="button"
                onClick={changePage(pages.security)}
                variant="body1"
              >
                Security
              </Link>
            </ListItem>
          </List>
        </Grid>
        <Grid className={s.content} item>
          {component}
        </Grid>
      </Grid>
    </div>
  );
}

export default Profile;
