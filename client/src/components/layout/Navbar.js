import React, { Fragment } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import { Link } from 'react-router-dom';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { logout } from '../../actions/userActions';

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

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const Navbar = ({ title, open, logout, isAuthenticated }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
          {isAuthenticated ? (
            <Grid item container xs={2} className={classes.grid}>
              <IconButton
                edge='start'
                className={classes.menuButton}
                to='/user'
                component={Link}
              >
                <AccountBalanceIcon fontSize='large' className={classes.icon} />
              </IconButton>
              <Typography variant='h6' className={classes.title}>
                <Hidden xsDown>Financial Planner</Hidden>
              </Typography>
            </Grid>
          ) : (
            <Grid item container xs={2} className={classes.grid}>
              <IconButton
                edge='start'
                className={classes.menuButton}
                to='/'
                component={Link}
              >
                <AccountBalanceIcon fontSize='large' className={classes.icon} />
              </IconButton>
              <Typography variant='h6' className={classes.title}>
                <Hidden xsDown>Financial Planner</Hidden>
              </Typography>
            </Grid>
          )}
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
            {isAuthenticated ? (
              <IconButton
                edge='start'
                className={classes.menuButton}
                color='inherit'
                aria-label='menu'
                onClick={handleClick}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Fragment />
            )}
            <StyledMenu
              id='customized-menu'
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <StyledMenuItem>
                <ListItemIcon>
                  <DraftsIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText primary='Drafts' />
              </StyledMenuItem>
              <StyledMenuItem>
                <ListItemIcon>
                  <InboxIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText primary='Inbox' />
              </StyledMenuItem>
              <StyledMenuItem
                onClick={() => {
                  logout();
                  handleClose();
                }}
              >
                <ListItemIcon>
                  <ExitToAppIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText primary='Logout' />
              </StyledMenuItem>
            </StyledMenu>
          </Grid>
        </Grid>
      </Toolbar>
    </Drawer>
  );
};

Navbar.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  title: state.nav.title,
  open: state.nav.barOpen,
  isAuthenticated: state.users.isAuthenticated,
});
export default connect(mapStateToProps, { logout })(Navbar);
