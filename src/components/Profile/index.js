import React from 'react';
import { useSelector } from 'react-redux';

import { getCurrentUser } from '../../selectors/user';

import s from './index.module.scss';

function Profile() {
  const user = useSelector(getCurrentUser);

  console.log(user);

  return (
    <div className={s.root}>
      {`Welcome ${user.firstName} ${user.lastName}`}
    </div>
  );
}

export default Profile;
