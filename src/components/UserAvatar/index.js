import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';

function UserAvatar(props) {
  const {
    firstName = '',
    lastName = '',
  } = props.user;

  const initials = `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase();

  return (
    <Avatar
      className={props.className}
      src={props.user.photoUrl}
    >
      {initials}
    </Avatar>
  );
}

UserAvatar.propTypes = {
  className: PropTypes.string,
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    photoUrl: PropTypes.string,
  }).isRequired,
};

UserAvatar.defaultProps = {
  className: '',
};

export default UserAvatar;
