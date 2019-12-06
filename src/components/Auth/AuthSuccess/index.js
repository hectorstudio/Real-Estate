import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

import { ROUTES } from '../../../constants';

import s from './index.module.scss';

function AuthSuccess(props) {
  const dispatch = useDispatch();

  const goBack = () => dispatch(push(ROUTES.home()));

  const TypographyComponent = (content, key) => (
    <Typography
      className={s.paragraph}
      key={key}
      variant="body1"
    >
      {content}
    </Typography>
  );

  return (
    <>
      {props.body.map((content, i) => TypographyComponent(content, i))}
      <Button
        className={s.button}
        color="primary"
        fullWidth
        onClick={goBack}
        variant="outlined"
      >
        Go back
      </Button>
    </>
  );
}

AuthSuccess.propTypes = {
  body: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default AuthSuccess;
