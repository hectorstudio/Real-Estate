import React from 'react';
import { Route, Switch } from 'react-router';
import { makeStyles } from '@material-ui/styles';
import { Grid, Container } from '@material-ui/core';

import { ROUTES } from '../../constants';

import LayoutPaper from '../UI/LayoutPaper';
import PhotoForm from './PhotoForm';
import ProfileForm from './ProfileForm';
import SecurityForm from './SecurityForm';
import Sidebar from '../UI/Sidebar';

const useStyles = makeStyles(/* istanbul ignore next */ () => ({
  content: {
    flexGrow: 1,
  },
  sidebar: {
    width: 240,
  },
}));

function Profile() {
  const s = useStyles();

  return (
    <Container maxWidth="md">
      <Grid container spacing={3} wrap="nowrap">
        <Grid item>
          <Sidebar
            className={s.sidebar}
            items={[
              {
                icon: 'person',
                label: 'Personal information',
                to: ROUTES.profile.main(),
              },
              {
                icon: 'add_a_photo',
                label: 'Profile photo',
                to: ROUTES.profile.photo(),
              },
              {
                icon: 'security',
                label: 'Security',
                to: ROUTES.profile.security(),
              },
            ]}
          />
        </Grid>
        <Grid className={s.content} item>
          <LayoutPaper>
            <Switch>
              <Route component={ProfileForm} exact path={ROUTES.profile.main()} />
              <Route component={PhotoForm} exact path={ROUTES.profile.photo()} />
              <Route component={SecurityForm} exact path={ROUTES.profile.security()} />
            </Switch>
          </LayoutPaper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Profile;
