import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    boxSizing: 'border-box',
    minHeight: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));

function LayoutPaper(props) {
  const s = useStyles();

  return (
    <Paper className={clsx(s.root, props.className)}>
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
