import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser, loadUser, clearErrors } from '../../actions/userActions';
import { setTitle, closeBar } from '../../actions/navActions';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Grid,
  Typography,
  Divider,
  Button,
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import logo from '../images/logo.jpg';
import { Redirect, Link } from 'react-router-dom';
import { setAlert } from '../../actions/alertActions';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
    },
  },
  card: {
    margin: 20,
  },
  field: {
    paddingBottom: 10,
  },
  media: {
    height: 250,
    padding: 20,
  },
  or: {
    paddingTop: 40,
  },
  divider: {
    margin: 40,
  },
  forgot: {
    float: 'right',
  },
  title: {
    margin: 20,
  },
}));

const Login = ({
  loginUser,
  isAuthenticated,
  setTitle,
  closeBar,
  error,
  loadUser,

  userinfo,
  setAlert,
  clearErrors,
}) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (error) {
      if (error.errors) {
        setAlert(error.errors[0].msg, 'error');
        clearErrors();
      }
    }
  }, [error, setAlert, clearErrors]);

  useEffect(() => {
    setTitle('Login User');
    closeBar();
    if (localStorage.token || isAuthenticated) {
      loadUser();
      console.log('in login');
    }

    // eslint-disable-next-line
  }, [isAuthenticated]);

  const { email, password } = user;
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'error');
    } else {
      loginUser({
        email,
        password,
      });
    }
  };

  const classes = useStyles();

  if (isAuthenticated && userinfo) {
    if (userinfo.completedReg) {
      return <Redirect to='/user' />;
    } else {
      return <Redirect to='/register' />;
    }
  } else {
    return (
      <Grid container direction='column'>
        <Card className={classes.card}>
          <CardContent>
            <div align='center'>
              <img src={logo} alt='logo' width='200' height='200' />
              <Typography variant='h6' className={classes.title}>
                Financial Planner
              </Typography>
            </div>

            <Divider variant='middle' />

            <TextField
              id='email'
              label='Email Address'
              variant='outlined'
              autoComplete='email'
              type='email'
              name='email'
              value={email}
              onChange={onChange}
              fullWidth
              className={classes.field}
            />

            <TextField
              id='password'
              label='Password'
              type='password'
              autoComplete='password'
              variant='outlined'
              name='password'
              value={password}
              onChange={onChange}
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
              Login
            </Button>
          </CardActions>
          <CardActions className={classes.forgot}>
            <Button
              color='primary'
              to='/forgotPassword'
              component={Link}
              size='small'
              className={classes.forgot}
            >
              Forgot Password
            </Button>
          </CardActions>
          <Grid item container xs={12}>
            <Grid
              item
              xs={12}
              container
              justify='flex-end'
              alignItems='flex-start'
            ></Grid>
            <Grid item xs={12}>
              <Typography align={'center'}>OR</Typography>
            </Grid>
          </Grid>

          <Divider className={classes.divider} />
          <Typography align={'center'}>Don't have and account?</Typography>
          <CardActions>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              to='/register'
              component={Link}
              fullWidth
            >
              Register
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  }
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  closeBar: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  loadUser: PropTypes.func.isRequired,

  userinfo: PropTypes.object,
  setAlert: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.users.isAuthenticated,
  userinfo: state.users.user,
  error: state.users.error,
});

export default connect(mapStateToProps, {
  loginUser,
  setTitle,
  closeBar,
  loadUser,
  setAlert,
  clearErrors,
})(Login);
