import PropTypes from 'prop-types';
import React from 'react';
import clsx from 'clsx';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import styles from '../../../styles';

const useStyles = makeStyles(/* istanbul ignore next */(theme) => ({
  root: {
    boxSizing: 'border-box',
    minHeight: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));

function LayoutPaper(props) {
  const s = useStyles();

  return (
    <Paper className={clsx(s.root, props.className)} elevation={styles.elevation}>
      {props.children}
    </Paper>
  );
}

LayoutPaper.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

LayoutPaper.defaultProps = {
  children: null,
  className: '',
};

export default LayoutPaper;
