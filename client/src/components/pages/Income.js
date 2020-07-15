import React, { useState, useEffect, Fragment } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { setTitle, openBar } from '../../actions/navActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import PersonIcon from '@material-ui/icons/Person';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import { Link } from 'react-router-dom';
import {
  editUser,
  editPartner,
  loadPartner,
  setLoading,
} from '../../actions/userActions';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ReceiptIcon from '@material-ui/icons/Receipt';
import Tooltip from '@material-ui/core/Tooltip';
import { editGoal, loadGoal, clearErrors } from '../../actions/goalActions';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { setAlert } from '../../actions/alertActions';

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

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Income = ({
  openBar,
  setTitle,
  user,
  editUser,
  partner,
  loadPartner,
  editPartner,
  editGoal,
  loadGoal,
  goal,
  clearErrors,
  formLoading,
  setLoading,
  setAlert,
  error,
  edit,
}) => {
  const classes = useStyles();
  useEffect(() => {
    setTitle('Income');
    openBar();

    if (user.partner && !partner) {
      loadPartner();
    }
    if (!goal) loadGoal();

    // eslint-disable-next-line
  }, []);

  const [userFields, setUser] = useState({
    income: user.income,
    increase: user.increase,
  });

  const [userIncrease, setUserIncrease] = useState(userFields.increase);
  const handleUserIncrease = (event, newValue) => {
    setUserIncrease(newValue);
    setUser({ ...userFields, increase: newValue });
  };

  const onUserChange = (e) => {
    setUser({ ...userFields, income: e.target.value });
  };

  const [partnerFields, setPartner] = useState({
    income: 0,
    increase: 0,
  });

  useEffect(() => {
    if (partner) {
      setPartner({
        income: partner.income,
        increase: partner.increase,
      });
      setPartnerIncrease(partner.increase);
    }
  }, [partner]);

  const [partnerIncrease, setPartnerIncrease] = useState(
    partnerFields.increase
  );
  const handlePartnerIncrease = (event, newValue) => {
    setPartnerIncrease(newValue);
    setPartner({ ...partnerFields, increase: newValue });
  };

  const onPartnerChange = (e) => {
    setPartner({ ...partnerFields, income: e.target.value });
  };

  const [goals, setGoals] = useState({
    house: 0,
    school: 0,
  });

  const onGoalChange = (e) => {
    setGoals({ ...goals, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (goal) {
      setGoals({
        house: goal.house,
        school: goal.school,
      });
    }
  }, [goal]);

  useEffect(() => {
    if (edit) {
      setAlert('Update Successfull!', 'success');

      clearErrors();
    }
    // eslint-disable-next-line
  }, [edit]);

  useEffect(() => {
    if (error) {
      if (error.errors) {
        setAlert(error.errors[0].msg, 'error');
        clearErrors();
      }
    }
  }, [error, setAlert, clearErrors]);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading();
    editUser(userFields);
    editPartner(partnerFields);
    editGoal(goals);
  };

  return (
    <Grid container direction='column'>
      <Grid item>
        <Card className={classes.root} variant='outlined'>
          <CardContent>
            <Grid container spacing={2} direction='column'>
              <Grid item>
                <Card>
                  <CardHeader
                    classes={{
                      title: classes.cardTitle,
                    }}
                    avatar={
                      <IconButton aria-label='settings'>
                        <Avatar aria-label='icon' className={classes.avatar}>
                          <PersonIcon />
                        </Avatar>
                      </IconButton>
                    }
                    title={user.fullName}
                    subheader='Main User Income'
                    className={classes.cardHead}
                  />

                  <CardContent>
                    <TextField
                      margin='dense'
                      id='income'
                      name='income'
                      label='Annual Income'
                      type='number'
                      value={userFields.income}
                      onChange={onUserChange}
                      fullWidth
                    />
                    <Typography
                      className={classes.title}
                      color='textSecondary'
                      gutterBottom
                    >
                      Annual Increase: {userIncrease}%
                    </Typography>

                    <Slider
                      id='userIncrease'
                      name='userIncrease'
                      value={userIncrease}
                      onChange={handleUserIncrease}
                      min={0}
                      max={30}
                      color='primary'
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item>
                {partner ? (
                  <Card>
                    <CardHeader
                      classes={{
                        title: classes.cardTitle,
                      }}
                      avatar={
                        <IconButton aria-label='settings'>
                          <Avatar aria-label='icon' className={classes.avatar}>
                            <PeopleAltIcon />
                          </Avatar>
                        </IconButton>
                      }
                      title={partner.fullName}
                      subheader='Partner Income'
                      className={classes.cardHead}
                    />

                    <CardContent>
                      <TextField
                        margin='dense'
                        id='income'
                        name='income'
                        label='Annual Income'
                        type='number'
                        value={partnerFields.income}
                        onChange={onPartnerChange}
                        fullWidth
                      />
                      <Typography
                        className={classes.title}
                        color='textSecondary'
                        gutterBottom
                      >
                        Annual Increase: {partnerIncrease}%
                      </Typography>

                      <Slider
                        id='partnerIncrease'
                        name='partnerIncrease'
                        value={partnerIncrease}
                        onChange={handlePartnerIncrease}
                        min={0}
                        max={30}
                        color='primary'
                      />
                    </CardContent>
                  </Card>
                ) : (
                  <Fragment />
                )}
              </Grid>
              <Grid item>
                <Card>
                  <CardHeader
                    classes={{
                      title: classes.cardTitle,
                    }}
                    avatar={
                      <IconButton aria-label='settings'>
                        <Avatar aria-label='icon' className={classes.avatar}>
                          <ReceiptIcon />
                        </Avatar>
                      </IconButton>
                    }
                    title='Household Cost'
                    className={classes.cardHead}
                  />

                  <Tooltip title='Food, Transportation, Rent, Utilities'>
                    <CardContent>
                      <TextField
                        margin='dense'
                        id='house'
                        name='house'
                        label='Basic'
                        type='number'
                        value={goals.house}
                        onChange={onGoalChange}
                        fullWidth
                      />
                    </CardContent>
                  </Tooltip>
                </Card>
              </Grid>
              <Grid item>
                <Card>
                  <CardHeader
                    classes={{
                      title: classes.cardTitle,
                    }}
                    avatar={
                      <IconButton aria-label='settings'>
                        <Avatar aria-label='icon' className={classes.avatar}>
                          <LocalLibraryIcon />
                        </Avatar>
                      </IconButton>
                    }
                    title='Schooling Cost'
                    className={classes.cardHead}
                  />

                  <CardContent>
                    <TextField
                      margin='dense'
                      id='school'
                      name='school'
                      label='Cost'
                      type='number'
                      value={goals.school}
                      onChange={onGoalChange}
                      fullWidth
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions className={classes.buttons}>
            <Button
              variant='contained'
              color='secondary'
              to='/user'
              component={Link}
            >
              Back
            </Button>
            <Button variant='contained' color='primary' onClick={onSubmit}>
              Save
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

Income.propTypes = {
  openBar: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  editUser: PropTypes.func.isRequired,
  partner: PropTypes.object,
  loadPartner: PropTypes.func.isRequired,
  editPartner: PropTypes.func.isRequired,
  editGoal: PropTypes.func.isRequired,
  loadGoal: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  formloading: PropTypes.bool,
  setLoading: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,

  edit: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.users.user,
  partner: state.users.partnerInfo,
  goal: state.goals.goal,
  formLoading: state.users.formLoading,
  error: state.goals.error,
  edit: state.goals.edit,
});
export default connect(mapStateToProps, {
  openBar,
  setTitle,
  editUser,
  loadPartner,
  editPartner,
  editGoal,
  loadGoal,
  clearErrors,
  setLoading,
  setAlert,
})(Income);
