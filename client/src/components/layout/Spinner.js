import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {},
    paddingTop: 100,
  },
}));

export default function Spinner() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <LinearProgress />
    </Container>
  );
}
