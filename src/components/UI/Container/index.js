import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Container as MUIContainer } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(3),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  containerWithSidebar: {
    boxSizing: 'border-box',
    marginLeft: 240,
    width: 'calc(100% - 240px)',
  },
  toolbar: {
    ...theme.mixins.toolbar,
  },
}));

function Container(props) {
  const s = useStyles();

  return (
    <MUIContainer
      className={clsx(s.container, props.className, { [s.containerWithSidebar]: props.sidebar })}
      maxWidth={props.maxWidth}
    >
      <div className={s.toolbar} />
      {props.children}
    </MUIContainer>
  );
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', false]),
  sidebar: PropTypes.bool,
};

Container.defaultProps = {
  className: '',
  maxWidth: false,
  sidebar: false,
};

export default Container;
