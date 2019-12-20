import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';

function UserAvatar(props) {
  const initials = `${props.user.firstName[0]}${props.user.lastName[0]}`.toUpperCase();

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
