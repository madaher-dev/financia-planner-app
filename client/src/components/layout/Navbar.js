import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import Drawer from '@material-ui/core/Drawer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles((theme) => ({
  icon: {
    paddingRight: 10,
    color: 'white',
  },
  title: {
    color: 'white',
  },
  menuButton: {
    color: 'white',
  },
  drawer: {
    flexGrow: 1,
    flexShrink: 0,
  },
  drawerPaper: {
    flexGrow: 1,
    background: theme.palette.primary.main,
  },
  grid: {
    alignItems: 'center', //for vertical align
  },
}));

const Navbar = ({ title, open }) => {
  const classes = useStyles();
  return (
    <Drawer
      className={classes.drawer}
      variant='persistent'
      anchor='top'
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar>
        <Grid container>
          <Grid item container xs={2} className={classes.grid}>
            <AccountBalanceIcon fontSize='large' className={classes.icon} />
            <Typography variant='h6' className={classes.title}>
              <Hidden xsDown>Financial Planner</Hidden>
            </Typography>
          </Grid>
          <Grid item container xs={8} justify='center' className={classes.grid}>
            <Typography variant='h6' className={classes.title}>
              {title}
            </Typography>
          </Grid>
          <Grid
            item
            container
            xs={2}
            className={classes.grid}
            justify='flex-end'
          >
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='menu'
            >
              <MenuIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </Drawer>
  );
};

Navbar.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
};

const mapStateToProps = (state) => ({
  title: state.nav.title,
  open: state.nav.barOpen,
});
export default connect(mapStateToProps, {})(Navbar);
