import React, { useState } from 'react';

import AuthHeader from '../AuthHeader';

import AuthSuccess from '../AuthSuccess';
import SignUpForm from './SignUpForm';

function SignUp() {
  const [email, setEmail] = useState('foo');

  const setUserEmail = (userObj) => {
    setEmail(userObj.email);
  };

  const title = email
    ? 'Your account has been created!'
    : 'Sign up';

  const component = email
    ? (
      <AuthSuccess
        body={[
          (
            <>
              {'A verification email has been sent to '}
              <b>{email}</b>
              {'.'}
            </>
          ),
          'Please click on the link attached to the email to activate your account.',
        ]}
      />
    )
    : <SignUpForm onEmailSubmit={setUserEmail} />;

  return (
    <>
      <AuthHeader title={title} />
      {component}
    </>
  );
}

export default SignUp;
