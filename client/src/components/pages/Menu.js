import React, { useEffect } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { setTitle, openBar } from '../../actions/navActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import IconButton from '@material-ui/core/IconButton';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import HistoryIcon from '@material-ui/icons/History';
import SchoolIcon from '@material-ui/icons/School';
import GolfCourseIcon from '@material-ui/icons/GolfCourse';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
    },
  },
  navShift: {
    marginTop: 30,
  },

  icon: {
    marginLeft: 0,
    '&:hover': {
      backgroundColor: '#ee99fc',
    },
  },
  card: {
    marginBottom: 40,
    color: 'red',
  },
  name: {
    paddingLeft: 40,
    paddingBottom: 20,
  },
  button: {
    marginLeft: 20,
    marginRight: 20,
  },
}));

const Menu = ({ openBar, setTitle, loadUser, user }) => {
  useEffect(() => {
    setTitle('Home');
    openBar();

    // eslint-disable-next-line
  }, []);

  const classes = useStyles();
  const name = user.fullName;
  return (
    <Grid container direction='column' className={classes.navShift}>
      <Grid item className={classes.name}>
        <Typography variant='h5' color='primary'>
          Welcome {name}{' '}
        </Typography>
      </Grid>
      <Grid item className={classes.button}>
        <Card className={classes.card} variant='outlined' raised='true'>
          <CardContent>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                container
                justify='space-around'
                alignItems='center'
              >
                <Grid item>
                  <IconButton
                    edge='start'
                    color='primary'
                    aria-label='menu'
                    className={classes.icon}
                    to='/user/income'
                    component={Link}
                  >
                    <MonetizationOnIcon style={{ fontSize: 80 }} />
                  </IconButton>
                  <Typography align='center' color='primary'>
                    Income
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton
                    edge='start'
                    color='primary'
                    aria-label='menu'
                    className={classes.icon}
                    to='/user/assets'
                    component={Link}
                  >
                    <AccountBalanceWalletIcon style={{ fontSize: 80 }} />
                  </IconButton>
                  <Typography align='center' color='primary'>
                    Assets
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton
                    edge='start'
                    color='primary'
                    aria-label='menu'
                    className={classes.icon}
                    to='/user/loans'
                    component={Link}
                  >
                    <HistoryIcon style={{ fontSize: 80 }} />
                  </IconButton>
                  <Typography align='center' color='primary'>
                    Loans
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  container
                  justify='space-around'
                  alignItems='center'
                >
                  <Grid item>
                    <IconButton
                      edge='start'
                      color='primary'
                      aria-label='menu'
                      className={classes.icon}
                      to='/user/family'
                      component={Link}
                    >
                      <SchoolIcon style={{ fontSize: 80 }} />
                    </IconButton>
                    <Typography align='center' color='primary'>
                      Family
                    </Typography>
                  </Grid>
                  <Grid item>
                    <IconButton
                      edge='start'
                      color='primary'
                      aria-label='menu'
                      className={classes.icon}
                      to='/user/goals'
                      component={Link}
                    >
                      <GolfCourseIcon style={{ fontSize: 80 }} />
                    </IconButton>
                    <Typography align='center' color='primary'>
                      Goals
                    </Typography>
                  </Grid>
                  <Grid item>
                    <IconButton
                      edge='start'
                      color='primary'
                      aria-label='menu'
                      className={classes.icon}
                      to='/user/profile'
                      component={Link}
                    >
                      <PermContactCalendarIcon style={{ fontSize: 80 }} />
                    </IconButton>
                    <Typography align='center' color='primary'>
                      Profile
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Button variant='contained' color='secondary' type='submit' fullWidth>
          Generate Report
        </Button>
      </Grid>
    </Grid>
  );
};

Menu.propTypes = {
  openBar: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.users.isAuthenticated,
  user: state.users.user,
});
export default connect(mapStateToProps, {
  openBar,
  setTitle,
})(Menu);
