import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  registerUser,
  loadUser,
  editUser,
  addPartner,
  clearErrors,
} from '../../actions/userActions';
import { setTitle, openBar } from '../../actions/navActions';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Grid, Divider, Button } from '@material-ui/core';
import { Stepper, Step, StepLabel } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { DatePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Redirect } from 'react-router-dom';
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
  divider: {
    marginBottom: 40,
  },
}));
const steps = ['User Info', 'User Details', 'Partner Details (Optional)'];

const Register = ({
  registerUser,
  isAuthenticated,
  setTitle,
  openBar,
  loadUser,
  editUser,
  addPartner,
  setAlert,
  clearErrors,
  userinfo,
  error,
  partnerAdded,
}) => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
    dob: '',
    title: '10',
    occupation: '',
    phone: '',
    partner: false,
  });

  const [partner, psetPartner] = useState({
    pfirstName: '',
    plastName: '',
    pemail: '',

    pdob: '',
    ptitle: '10',
    poccupation: '',
    pphone: '',
  });
  useEffect(() => {
    setTitle('Register User');
    openBar();
    if (localStorage.token) {
      loadUser();
      console.log('in register');
    }
    // eslint-disable-next-line
  }, []);

  const [dateob, handleDOB] = useState(new Date());
  const [pdateob, phandleDOB] = useState(new Date());
  const {
    title,
    firstName,
    lastName,
    email,
    password,
    password2,
    occupation,
    phone,
  } = user;

  const {
    ptitle,
    pfirstName,
    plastName,
    pemail,

    poccupation,
    pphone,
  } = partner;

  useEffect(() => {
    if (error) {
      if (error.errors) {
        setAlert(error.errors[0].msg, 'error');
        clearErrors();
      }
    }
  }, [error, setAlert, clearErrors]);

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  const ponChange = (e) =>
    psetPartner({ ...partner, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      setAlert('Passwords do not match', 'error');
    } else {
      registerUser(user);
    }
  };

  const ponSubmit = (e) => {
    e.preventDefault();

    addPartner(partner, pdateob);
  };

  useEffect(() => {
    if (partnerAdded) {
      editUser(user, dateob);
    }
    // eslint-disable-next-line
  }, [partnerAdded]);

  const submitEdit = (e) => {
    e.preventDefault();
    editUser(user, dateob);
  };

  const handlePartner = (e) => {
    setTitle('Add Partner Info');
    handleNext();
  };
  const handleNext = (newValues) => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = (newValues) => {
    setActiveStep(activeStep - 1);
    setTitle('Complete Information');
  };
  const [partnercheck, setPartner] = useState(false);
  const onPartnerChange = (e) => {
    if (e.target.checked) {
      setUser({ ...user, partner: true });
      setPartner(true);
    } else {
      setUser({ ...user, partner: false });
      setPartner(false);
    }
  };

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      handleNext();
      setTitle('Complete Information');
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <Fragment>
            <CardContent>
              <Divider variant='middle' className={classes.divider} />
              <FormControl className={classes.field}>
                <InputLabel id='title-label'>Title</InputLabel>
                <Select
                  labelId='title'
                  name='title'
                  id='title'
                  value={title}
                  onChange={onChange}
                  variant='outlined'
                >
                  <MenuItem id='title' value={10}>
                    Mr
                  </MenuItem>
                  <MenuItem id='title' value={20}>
                    Mrs
                  </MenuItem>
                </Select>
              </FormControl>
              <TextField
                id='firstName'
                label='First Name'
                variant='outlined'
                type='text'
                name='firstName'
                value={firstName}
                onChange={onChange}
                fullWidth
                autoComplete='firstName'
                className={classes.field}
                display='none'
              />
              <TextField
                id='lastName'
                label='Last Name'
                variant='outlined'
                type='text'
                name='lastName'
                value={lastName}
                onChange={onChange}
                fullWidth
                autoComplete='last name'
                className={classes.field}
                display='none'
              />

              <TextField
                id='outlined-email'
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
                id='outlined-password-input'
                label='Password'
                type='password'
                variant='outlined'
                name='password'
                value={password}
                onChange={onChange}
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
                Next
              </Button>
            </CardActions>
          </Fragment>
        );
      case 1:
        return (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <CardContent>
              <Divider variant='middle' className={classes.divider} />
              <DatePicker
                disableFuture
                openTo='year'
                inputVariant='outlined'
                format='dd/MM/yyyy'
                label='Date of birth'
                views={['year', 'month', 'date']}
                value={dateob}
                onChange={handleDOB}
                fullWidth
                className={classes.field}
              />
              <TextField
                id='occupation'
                label='Occupation'
                type='text'
                autoComplete='occupation'
                variant='outlined'
                name='occupation'
                value={occupation}
                onChange={onChange}
                fullWidth
                className={classes.field}
              />
              <TextField
                id='phone'
                label='Phone Number'
                type='text'
                autoComplete='phone'
                variant='outlined'
                name='phone'
                value={phone}
                onChange={onChange}
                fullWidth
                className={classes.field}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={partnercheck}
                    onChange={onPartnerChange}
                    name='partner'
                  />
                }
                label='Have Partner?'
              />
            </CardContent>
            <CardActions>
              {partnercheck ? (
                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                  onClick={handlePartner}
                  fullWidth
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant='contained'
                  color='secondary'
                  type='submit'
                  onClick={submitEdit}
                  fullWidth
                >
                  Complete
                </Button>
              )}
            </CardActions>
          </MuiPickersUtilsProvider>
        );
      case 2:
        return (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <CardContent>
              <Divider variant='middle' className={classes.divider} />
              <FormControl className={classes.field}>
                <InputLabel id='title-label'>Title</InputLabel>
                <Select
                  labelId='ptitle'
                  name='ptitle'
                  id='ptitle'
                  value={ptitle}
                  onChange={ponChange}
                  variant='outlined'
                >
                  <MenuItem id='ptitle' value={10}>
                    Mr
                  </MenuItem>
                  <MenuItem id='ptitle' value={20}>
                    Mrs
                  </MenuItem>
                </Select>
              </FormControl>
              <TextField
                id='pfirstName'
                label='First Name'
                variant='outlined'
                type='text'
                name='pfirstName'
                value={pfirstName}
                onChange={ponChange}
                fullWidth
                className={classes.field}
                display='none'
              />
              <TextField
                id='plastName'
                label='Last Name'
                variant='outlined'
                type='text'
                name='plastName'
                value={plastName}
                onChange={ponChange}
                fullWidth
                className={classes.field}
                display='none'
              />

              <TextField
                id='outlined-email'
                label='Email Address'
                variant='outlined'
                autoComplete='pemail'
                type='email'
                name='pemail'
                value={pemail}
                onChange={ponChange}
                fullWidth
                className={classes.field}
              />
              <DatePicker
                disableFuture
                openTo='year'
                inputVariant='outlined'
                format='dd/MM/yyyy'
                label='Date of birth'
                views={['year', 'month', 'date']}
                value={pdateob}
                onChange={phandleDOB}
                fullWidth
                className={classes.field}
              />
              <TextField
                id='poccupation'
                label='Occupation'
                type='text'
                variant='outlined'
                name='poccupation'
                value={poccupation}
                onChange={ponChange}
                fullWidth
                className={classes.field}
              />
              <TextField
                id='pphone'
                label='Phone Number'
                type='text'
                variant='outlined'
                name='pphone'
                value={pphone}
                onChange={ponChange}
                fullWidth
                className={classes.field}
              />
            </CardContent>
            <CardActions>
              <Button
                variant='contained'
                color='secondary'
                type='submit'
                onClick={handleBack}
                fullWidth
              >
                Back
              </Button>
              <Button
                variant='contained'
                color='primary'
                type='submit'
                onClick={ponSubmit}
                fullWidth
              >
                Complete
              </Button>
            </CardActions>
          </MuiPickersUtilsProvider>
        );
      default:
        throw new Error('Mis-step!');
    }
  }

  const classes = useStyles();

  if (isAuthenticated && userinfo) {
    if (userinfo.completedReg) {
      return <Redirect to='/user' />;
    } else {
      return (
        <Grid container direction='column'>
          <Card className={classes.card}>
            <Stepper
              activeStep={activeStep}
              className={classes.stepper}
              alternativeLabel
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Fragment>
              {activeStep === steps.length ? (
                <p>You're done!</p>
              ) : (
                <Fragment> {getStepContent(activeStep)} </Fragment>
              )}
            </Fragment>
          </Card>
        </Grid>
      );
    }
  } else {
    return (
      <Grid container direction='column'>
        <Card className={classes.card}>
          <Stepper
            activeStep={activeStep}
            className={classes.stepper}
            alternativeLabel
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Fragment>
            {activeStep === steps.length ? (
              <p>You're done!</p>
            ) : (
              <Fragment> {getStepContent(activeStep)} </Fragment>
            )}
          </Fragment>
        </Card>
      </Grid>
    );
  }
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  openBar: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  loadUser: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
  addPartner: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  userinfo: PropTypes.object,
  clearErrors: PropTypes.func.isRequired,
  partnerAdded: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.users.isAuthenticated,
  userinfo: state.users.user,
  error: state.users.error,
  partnerAdded: state.users.partner,
});

export default connect(mapStateToProps, {
  registerUser,
  setTitle,
  openBar,
  loadUser,
  editUser,
  addPartner,
  setAlert,
  clearErrors,
})(Register);
