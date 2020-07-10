import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams, Redirect } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { TextField, Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { setAlert } from '../../actions/alertActions';
import {
  loadUser,
  setLoading,
  checkToken,
  clearErrors,
  resetPassword,
} from '../../actions/userActions';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { setTitle, openBar } from '../../actions/navActions';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
    },
  },
  text: {
    textAlign: 'center',
  },
  container: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(20),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  field: {
    paddingBottom: 10,
  },
  top: {
    paddingTop: 40,
  },
  title: {
    marginBottom: 40,
  },
}));

const ResetPassword = ({
  setAlert,
  loadUser,
  setLoading,
  formLoading,
  setTitle,
  openBar,
  checkToken,
  resetEmail,
  loading,
  reset,
  error,
  clearErrors,
  resetPassword,
  email,
  token,
  isAuthenticated,
  userinfo,
}) => {
  // Pull Token from URL
  let { email_token } = useParams();

  // Set initial state for new password
  const [newPassword, setPass] = useState({
    password: '',
    password2: '',
  });

  // Alert Module
  useEffect(() => {
    if (error) {
      setAlert(error, 'error');
      clearErrors();
    }
  }, [error, setAlert, clearErrors]);

  // Check Token on load
  useEffect(() => {
    checkToken(email_token);

    // eslint-disable-next-line
  }, []);

  //load User when password changed
  useEffect(() => {
    if (token) loadUser();

    // eslint-disable-next-line
  }, [token]);

  const { password, password2 } = newPassword;

  const onChange = (e) =>
    setPass({ ...newPassword, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'error');
    } else if (password.length < 6) {
      setAlert('Please enter a password with 6 or more characters', 'error');
    } else {
      setLoading();
      resetPassword({ email, password, email_token });
    }
  };

  // set page title
  useEffect(() => {
    setTitle('Reset Password');
    openBar();

    // eslint-disable-next-line
  }, []);

  const classes = useStyles();

  const loadingPage = <Spinner />;

  const errorPage = <Redirect to='/' />;

  // Form page if token is correct
  const formPage = (
    <Card className={classes.card}>
      <CardContent>
        <Typography align={'center'}>Welcome {resetEmail}</Typography>
        <Typography align={'center'} className={classes.title}>
          Please Enter new Password
        </Typography>

        <TextField
          id='outlined-password-input'
          label='Password'
          type='password'
          variant='outlined'
          name='password'
          value={password}
          onChange={onChange}
          required={true}
          fullWidth
          className={classes.field}
        />

        <TextField
          id='outlined-password-confirm'
          label='Confirm Password'
          type='password'
          variant='outlined'
          name='password2'
          value={password2}
          onChange={onChange}
          required={true}
          fullWidth
          className={classes.field}
        />
      </CardContent>
      <CardActions>
        <Button
          variant='contained'
          color='primary'
          type='submit'
          onClick={onSubmit}
          fullWidth
        >
          Reset Password
        </Button>
      </CardActions>
    </Card>
  );
  if (isAuthenticated && userinfo) {
    if (userinfo.completedReg) {
      return <Redirect to='/user' />;
    } else {
      return <Redirect to='/register' />;
    }
  } else {
    return (
      <Grid container direction='column' className={classes.top}>
        {loading ? loadingPage : !reset ? errorPage : formPage}
        <Backdrop className={classes.backdrop} open={formLoading}>
          <CircularProgress color='inherit' />
        </Backdrop>
      </Grid>
    );
  }
};

ResetPassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  formLoading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  openBar: PropTypes.func.isRequired,
  resetEmail: PropTypes.string,
  checkToken: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  reset: PropTypes.bool.isRequired,
  error: PropTypes.string,
  resetPassword: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  formLoading: state.users.formLoading,
  resetEmail: state.users.email,
  loading: state.users.loading,
  reset: state.users.reset,
  error: state.users.error,
  email: state.users.email,
  token: state.users.token,
  isAuthenticated: state.users.isAuthenticated,
  userinfo: state.users.user,
});

export default connect(mapStateToProps, {
  setAlert,
  loadUser,
  setLoading,
  setTitle,
  openBar,
  checkToken,
  clearErrors,
  resetPassword,
})(ResetPassword);
