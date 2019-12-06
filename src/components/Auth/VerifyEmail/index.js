import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { Grid } from '@material-ui/core';

import { ROUTES } from '../../../constants';
import { applyActionCode } from '../../../actions/firebase';
import { getFirebaseErrorMessage } from '../../../helpers';
import { getQuery } from '../../../selectors/router';
import { setMessage } from '../../../actions/message';
import { verifyEmail } from '../../../actions/users';

import AuthHeader from '../AuthHeader';
import AuthSuccess from '../AuthSuccess';
import Loading from '../../Loading';

import s from './index.module.scss';

function VerifyEmail() {
  const dispatch = useDispatch();
  const params = useSelector(getQuery);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    applyActionCode(params.oobCode).then(() => {
      dispatch(verifyEmail());
      setLoading(false);
    }).catch((error) => {
      dispatch(setMessage(getFirebaseErrorMessage(error)));
      dispatch(push(ROUTES.home()));
    });
  }, [dispatch, params.oobCode]);

  return (
    <>
      <AuthHeader title="Verifying email" />
      {loading
        ? (
          <Grid className={s.loadingWrapper}>
            <Loading />
          </Grid>
        )
        : (
          <AuthSuccess
            body={[
              'Your email addres has been verified.',
              'You can now sign in using your email address and password.',
              'Click the button below to visit sign in form.',
            ]}
          />
        )}
    </>
  );
}

export default VerifyEmail;
