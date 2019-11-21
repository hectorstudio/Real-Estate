import React, { useState } from 'react';

import AuthHeader from '../AuthHeader';

import SignUpForm from './SignUpForm';
import AccountCreated from './AccountCreated';

function SignUp() {
  const [email, setEmail] = useState();
  const [user, setUser] = useState();

  const setUserEmail = (userObj) => {
    setEmail(userObj.email);
    setUser(userObj);
  }

  const title = email
    ? 'Your account has been created!'
    : 'Sign up';

  const component = email
    ? <AccountCreated email={email} user={user} />
    : <SignUpForm onEmailSubmit={setUserEmail} />;

  return (
    <>
      <AuthHeader title={title} />
      {component}
    </>
  )
}

export default SignUp;
