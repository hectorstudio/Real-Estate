import React, { useState, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import AuthHeader from '../AuthHeader';

import SignUpForm from './SignUpForm';
import AccountCreated from './AccountCreated';
import VerifyPhoneNumber from './VerifyPhoneNumber';

import s from './index.module.scss';

function SignUp() {
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [user, setUser] = useState();

  const setUserEmail = (userObj) => {
    setEmail(userObj.email);
    setUser(userObj);
  }
  const setUserPhone = (phone) => setPhone(phone);

  let title = 'Sign up';
  let component = <SignUpForm onEmailSubmit={setUserEmail} />
  if (email && !phone) {
    title = 'Your account has been created!';
    component = (
      <AccountCreated
        email={email}
        onPhoneSubmit={setUserPhone}
        user={user}
      />
    );
  } else
  if (phone) {
    title = 'Verify your account';
    component = (
      <VerifyPhoneNumber
        phone={phone}
        user={user}
      />
    );
  }

  return (
    <>
      <AuthHeader title={title} />
      {component}
    </>
  )
}

export default SignUp;
