import React, { useEffect, useState, Fragment } from 'react';
import { Typography } from '@material-ui/core';
import { setTitle, openBar } from '../../actions/navActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Grid, Button, TextField } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import PersonIcon from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Tooltip from '@material-ui/core/Tooltip';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { DatePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Link } from 'react-router-dom';
import {
  editUserForm,
  changePass,
  clearErrors,
  setLoading,
  loadPartner,
} from '../../actions/userActions';
import { setAlert } from '../../actions/alertActions';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import format from 'date-fns/format';
import { parseISO } from 'date-fns';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
    },
    marginTop: 30,
  },

  title: {
    fontSize: 14,
  },

  avatar: {
    backgroundColor: '#7e57c2',
  },

  avatar2: {
    backgroundColor: '#f50057',
  },
  cardHead: {
    backgroundColor: '#7e57c2',
  },
  buttons: {
    float: 'right',
  },
  cardTitle: {
    color: '#e0e0e0',
    fontSize: 18,
  },
  field: {
    paddingBottom: 10,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Profile = ({
  openBar,
  setTitle,
  partner,
  user,
  editUserForm,
  error,
  changePass,
  setAlert,
  clearErrors,
  formLoading,
  setLoading,
  update,
  partnerInfo,
  loadPartner,
}) => {
  const classes = useStyles();

  useEffect(() => {
    if (error) {
      if (error.errors) {
        setAlert(error.errors[0].msg, 'error');
        clearErrors();
      }
    }
  }, [error, setAlert, clearErrors]);

  useEffect(() => {
    setTitle('Profile');
    openBar();
    if (user.partner) {
      loadPartner();
    }
    // eslint-disable-next-line
  }, []);

  const [card, setCard] = useState(0);
  console.log(card);
  const {
    title,
    firstName,
    lastName,
    fullName,
    occupation,
    dob,
    phone,
    email,
  } = user;

  const [current, setCurrent] = useState({
    title: '10',
    firstName: '',
    lastName: '',
    email: '',
    occupation: '',
    phone: '',
    dob: '',
  });

  useEffect(() => {
    setCurrent({
      title: title,
      firstName: firstName,
      lastName: lastName,
      email: email,
      occupation: occupation,
      phone: phone,
      dob: dob,
    });

    // eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    setCurrent({ ...current, [e.target.name]: e.target.value });
  };

  const [dateob, handleDOB] = useState(dob);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!current.firstName || !current.lastName) {
      setAlert('Please fill in all required fileds', 'error');
    } else {
      setLoading();
      editUserForm(current, dateob);
    }
  };

  const [newPass, setPass] = useState({
    password: '',
    password2: '',
  });

  const onChangePass = (e) => {
    setPass({ ...newPass, [e.target.name]: e.target.value });
  };

  const onSubmitPass = (e) => {
    e.preventDefault();

    if (newPass.password !== newPass.password2) {
      setAlert('Passwords do not match', 'error');
    } else if (newPass.password.length < 6) {
      setAlert('Please enter a password with 6 or more characters', 'error');
    } else {
      setLoading();
      changePass(newPass.password);
    }
  };

  useEffect(() => {
    if (update) {
      setAlert('Update Successfull!', 'success');
      setCard(0);
      clearErrors();
    }
  }, [update]);

  // partner part

  const [currentPartner, setCurrentPartner] = useState({
    title: '10',
    firstName: '',
    lastName: '',
    email: '',
    occupation: '',
    phone: '',
    dob: '',
  });

  useEffect(() => {
    if (partnerInfo) {
      setCurrent({
        title: partnerInfo.title,
        firstName: partnerInfo.firstName,
        lastName: partnerInfo.lastName,
        email: partnerInfo.email,
        occupation: partnerInfo.occupation,
        phone: partnerInfo.phone,
        dob: partnerInfo.dob,
      });
    }
    // eslint-disable-next-line
  }, []);

  function cardChoser(card) {
    switch (card) {
      case 0: //User info
        return (
          <Card>
            <CardContent>
              <Typography>
                Name: {title === '10' ? 'Mr.' : 'Mrs.'} {fullName}
              </Typography>
              <Typography>Email: {email}</Typography>
              <Typography>Occupation: {occupation}</Typography>
              <Typography>
                Date of birth: {format(parseISO(dob), 'MM/dd/yyyy')}
              </Typography>
              <Typography>Phone number: {phone}</Typography>
            </CardContent>
            <CardActions>
              <Button
                variant='contained'
                color='secondary'
                onClick={() => setCard(2)}
              >
                Change Password
              </Button>
              <Button
                variant='contained'
                color='primary'
                onClick={() => setCard(1)}
              >
                Edit
              </Button>
            </CardActions>
          </Card>
        );
        break;
      case 1:
        return (
          <Card>
            <CardContent>
              <FormControl className={classes.field}>
                <InputLabel id='title-label'>Title</InputLabel>
                <Select
                  labelId='title'
                  name='title'
                  id='title'
                  value={current.title}
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
                value={current.firstName}
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
                value={current.lastName}
                onChange={onChange}
                fullWidth
                autoComplete='last name'
                className={classes.field}
                display='none'
              />

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
              </MuiPickersUtilsProvider>
              <TextField
                id='occupation'
                label='Occupation'
                type='text'
                autoComplete='occupation'
                variant='outlined'
                name='occupation'
                value={current.occupation}
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
                value={current.phone}
                onChange={onChange}
                fullWidth
                className={classes.field}
              />
            </CardContent>
            <CardActions>
              <Button
                variant='contained'
                color='secondary'
                onClick={() => setCard(0)}
              >
                Cancel
              </Button>
              <Button variant='contained' color='primary' onClick={onSubmit}>
                Save
              </Button>
            </CardActions>
          </Card>
        );
        break;
      case 2:
        return (
          <Card>
            <CardContent>
              <TextField
                id='password'
                label='New Password'
                variant='outlined'
                type='password'
                name='password'
                value={newPass.password}
                onChange={onChangePass}
                fullWidth
                className={classes.field}
                display='none'
              />
              <TextField
                id='password2'
                label='Confirm New Password'
                variant='outlined'
                type='password'
                name='password2'
                value={newPass.password2}
                onChange={onChangePass}
                fullWidth
                className={classes.field}
                display='none'
              />
            </CardContent>
            <CardActions>
              <Button
                variant='contained'
                color='secondary'
                onClick={() => setCard(0)}
              >
                Cancel
              </Button>
              <Button
                variant='contained'
                color='primary'
                onClick={onSubmitPass}
              >
                Change Password
              </Button>
            </CardActions>
          </Card>
        );
        break;
      case 3:
        return (
          <Card>
            <CardContent>
              <Typography>
                Name: {title === '10' ? 'Mr.' : 'Mrs.'} {partnerInfo.fullName}
              </Typography>
              <Typography>Email: {partnerInfo.email}</Typography>
              <Typography>Occupation: {partnerInfo.occupation}</Typography>
              <Typography>
                Date of birth: {format(parseISO(partnerInfo.dob), 'MM/dd/yyyy')}
              </Typography>
              <Typography>Phone number: {partnerInfo.phone}</Typography>
            </CardContent>
            <CardActions>
              <Button
                variant='contained'
                color='primary'
                onClick={() => setCard(4)}
              >
                Edit
              </Button>
            </CardActions>
          </Card>
        );
        break;
      case 4:
        return <Fragment></Fragment>;
      default:
        throw new Error('Mis-step!');
    }
  }

  return (
    <Grid container direction='column'>
      <Grid item>
        <Card className={classes.root} variant='outlined'>
          <CardContent>
            <Grid container spacing={2} direction='column'>
              <Grid item>
                <Tooltip title='View user info'>
                  <IconButton aria-label='settings' onClick={() => setCard(0)}>
                    <Avatar aria-label='icon' className={classes.avatar}>
                      <PersonIcon />
                    </Avatar>
                  </IconButton>
                </Tooltip>
                {partner ? (
                  <Tooltip title='View partner info'>
                    <IconButton
                      aria-label='settings'
                      onClick={() => setCard(3)}
                    >
                      <Avatar aria-label='icon' className={classes.avatar2}>
                        <PeopleAltIcon />
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title='Add Partner'>
                    <IconButton aria-label='settings'>
                      <Avatar aria-label='icon' className={classes.avatar2}>
                        <AddCircleOutlineIcon />
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                )}
              </Grid>
              <Grid item>{cardChoser(card)}</Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button size='small' to='/user' component={Link}>
              Back
            </Button>
          </CardActions>
        </Card>
        <Backdrop className={classes.backdrop} open={formLoading}>
          <CircularProgress color='inherit' />
        </Backdrop>
      </Grid>
    </Grid>
  );
};

Profile.propTypes = {
  openBar: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  partner: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  editUserForm: PropTypes.func.isRequired,
  error: PropTypes.object,
  changePass: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  formLoading: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  partner: state.users.user.partner,
  user: state.users.user,
  error: state.users.error,
  update: state.users.update,
  formLoading: state.users.formLoading,
  partnerInfo: state.users.partnerInfo,
});
export default connect(mapStateToProps, {
  openBar,
  setTitle,
  editUserForm,
  changePass,
  setAlert,
  clearErrors,
  setLoading,
  loadPartner,
})(Profile);
