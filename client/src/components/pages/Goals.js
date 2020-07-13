import React, { useEffect, useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import { setTitle, openBar } from '../../actions/navActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  editGoal,
  loadGoal,
  clearErrors,
  setLoading,
} from '../../actions/goalActions';
import RowingIcon from '@material-ui/icons/Rowing';
import SchoolIcon from '@material-ui/icons/School';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Link } from 'react-router-dom';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
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

const Goals = ({
  openBar,
  setTitle,
  editGoal,
  loadGoal,
  goal,
  setAlert,
  clearErrors,
  formLoading,
  setLoading,
  error,
  edit,
}) => {
  const classes = useStyles();
  useEffect(() => {
    setTitle('Goals');
    openBar();

    if (!goal) loadGoal();

    // eslint-disable-next-line
  }, []);

  const [goals, setGoals] = useState({
    retirment: 0,
    partnerRetirment: 0,
    uni: 0,
    vacation: 0,
    vacationNum: 0,
  });

  const onGoalChange = (e) => {
    setGoals({ ...goals, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (goal) {
      setGoals({
        retirment: goal.retirment,
        partnerRetirment: goal.partnerRetirment,
        uni: goal.uni,
        vacation: goal.vacation,
        vacationNum: goal.vacationNum,
      });
    }
  }, [goal]);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading();
    editGoal(goals);
  };

  useEffect(() => {
    if (edit) {
      setAlert('Update Successfull!', 'success');

      clearErrors();
    }
  }, [edit]);

  useEffect(() => {
    if (error) {
      if (error.errors) {
        setAlert(error.errors[0].msg, 'error');
        clearErrors();
      }
    }
  }, [error, setAlert, clearErrors]);

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
                          <RowingIcon />
                        </Avatar>
                      </IconButton>
                    }
                    title='Post Retirment Annual Expenses'
                    className={classes.cardHead}
                  />

                  <CardContent>
                    <TextField
                      margin='dense'
                      id='retirment'
                      name='retirment'
                      label='Main'
                      type='number'
                      value={goals.retirment}
                      onChange={onGoalChange}
                      fullWidth
                    />
                    <TextField
                      margin='dense'
                      id='partnerRetirment'
                      name='partnerRetirment'
                      label='Partner'
                      type='number'
                      value={goals.partnerRetirment}
                      onChange={onGoalChange}
                      fullWidth
                    />
                  </CardContent>
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
                          <SchoolIcon />
                        </Avatar>
                      </IconButton>
                    }
                    title='Education Plan'
                    className={classes.cardHead}
                  />

                  <CardContent>
                    <TextField
                      margin='dense'
                      id='uni'
                      name='uni'
                      label='University Cost / Year'
                      type='number'
                      value={goals.uni}
                      onChange={onGoalChange}
                      fullWidth
                    />
                  </CardContent>
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
                          <BeachAccessIcon />
                        </Avatar>
                      </IconButton>
                    }
                    title='Vacation Goal'
                    className={classes.cardHead}
                  />

                  <CardContent>
                    <TextField
                      margin='dense'
                      id='vacation'
                      name='vacation'
                      label='Number of Vacations / Year'
                      type='number'
                      value={goals.vacation}
                      onChange={onGoalChange}
                      fullWidth
                    />
                    <TextField
                      margin='dense'
                      id='vacationNum'
                      name='vacationNum'
                      label='Cost'
                      type='number'
                      value={goals.vacationNum}
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

Goals.propTypes = {
  openBar: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  editGoal: PropTypes.func.isRequired,
  loadGoal: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
  edit: PropTypes.bool.isRequired,
  goal: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  goal: state.goals.goal,
  error: state.goals.error,
  edit: state.goals.edit,
  formLoading: state.goals.formLoading,
});
export default connect(mapStateToProps, {
  openBar,
  setTitle,
  editGoal,
  loadGoal,
  clearErrors,
  setLoading,
  setAlert,
})(Goals);
