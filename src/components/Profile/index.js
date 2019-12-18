import React from 'react';
import { Route, Switch } from 'react-router';
import { makeStyles } from '@material-ui/styles';
import { Grid, Container } from '@material-ui/core';

import { ROUTES } from '../../constants';

import ProfileForm from './ProfileForm';
import SecurityForm from './SecurityForm';
import Sidebar from '../UI/Sidebar';
import LayoutPaper from '../UI/LayoutPaper';

const useStyles = makeStyles(() => ({
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
              <Route component={SecurityForm} exact path={ROUTES.profile.security()} />
            </Switch>
          </LayoutPaper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Profile;
