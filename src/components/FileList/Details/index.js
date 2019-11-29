import React from 'react';
import PropTypes from 'prop-types';

import { getFileFormat } from '../../../helpers';

function Details(props) {
  const file = props.data;

  const fileType = getFileFormat(file.name);

  if (fileType === 'JSON') {
    return null;
  }

  return (
    <div>File details</div>
  );
}

Details.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default Details;
