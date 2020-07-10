import React, { useState, useEffect, Fragment } from 'react';
import { forgotPass, clearErrors, setLoading } from '../../actions/userActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { TextField, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { setAlert } from '../../actions/alertActions';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { setTitle, openBar } from '../../actions/navActions';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
    },
  },
  text: {
    textAlign: 'center',
  },
  forgot: {
    float: 'right',
  },
  container: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(20),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  card: {
    marginTop: 80,
  },
}));

const ForgotPass = ({
  forgotPass,
  clearErrors,
  setAlert,
  forgot,
  error,
  isAuthenticated,
  setLoading,
  loading,
  setTitle,
  openBar,
}) => {
  useEffect(() => {
    if (error) {
      console.log(error);
      if (error.errors) {
        setAlert(error.errors[0].msg, 'error');
        clearErrors();
      }
    }
  }, [error, clearErrors, setAlert]);

  useEffect(() => {
    if (forgot) {
      setAlert('Reset Email Sent', 'success');
    }
    clearErrors();
  }, [forgot, clearErrors, setAlert]);

  useEffect(() => {
    setTitle('Forgot Password');
    openBar();

    // eslint-disable-next-line
  }, [isAuthenticated]);

  const [user, setUser] = useState({
    email: '',
  });

  const { email } = user;
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '') {
      setAlert('Please entert your email', 'error');
    } else {
      setLoading();
      forgotPass({
        email,
      });
    }
  };

  const classes = useStyles();
  if (forgot) {
    return <Redirect to='/' />;
  } else if (isAuthenticated) {
    return <Redirect to='/user' />;
  } else {
    return (
      <Fragment>
        <Grid container direction='column'>
          <Card className={classes.card}>
            <CardContent>
              <TextField
                id='outlined-required'
                label='Email Address'
                variant='outlined'
                type='email'
                name='email'
                value={email}
                onChange={onChange}
                fullWidth
              />
            </CardContent>
            <CardActions>
              <Button
                variant='contained'
                color='primary'
                type='submit'
                fullWidth
                onClick={onSubmit}
              >
                Send Email
              </Button>
            </CardActions>
            <CardActions className={classes.forgot}>
              <Button
                color='primary'
                to='/'
                component={Link}
                size='small'
                className={classes.forgot}
              >
                Cancel
              </Button>
            </CardActions>
          </Card>
          <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color='inherit' />
          </Backdrop>
        </Grid>
      </Fragment>
    );
  }
};

ForgotPass.propTypes = {
  forgotPass: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object,
  forgot: PropTypes.bool,
  setAlert: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  setTitle: PropTypes.func.isRequired,
  openBar: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.users.isAuthenticated,
  error: state.users.error,
  forgot: state.users.forgot,
  loading: state.users.formLoading,
});

export default connect(mapStateToProps, {
  forgotPass,
  clearErrors,
  setAlert,
  setLoading,
  setTitle,
  openBar,
})(ForgotPass);
