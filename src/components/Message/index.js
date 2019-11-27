import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getMessage } from '../../selectors/message';
import { setMessage } from '../../actions/message';

import Snackbar from '../UI/Snackbar';

export default function Message(props) {
  const dispatch = useDispatch();
  const message = useSelector(getMessage);

  console.log('MMM');
  console.log(message);

  return (
    <Snackbar
      message={message}
      onClose={() => dispatch(setMessage())}
      {...props}
    />
  );
}
