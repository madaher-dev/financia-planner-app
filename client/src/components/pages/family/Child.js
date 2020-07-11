import React, { useEffect } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { setTitle, openBar } from '../../../actions/navActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import AddChild from './AddChild';
import EditChild from './EditChild';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ChildCard from './ChildCard';

import Spinner from '../../layout/Spinner';
import { getFamily, clearCurrent } from '../../../actions/childActions';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
    },
  },

  firstRow: {
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 20,
  },
  icon: {
    paddingRight: 15,
    '&:hover': {
      backgroundColor: '#ee99fc',
    },
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

const Child = ({
  openBar,
  setTitle,
  family,
  getFamily,
  loading,

  clearCurrent,
}) => {
  const classes = useStyles();
  useEffect(() => {
    setTitle('Family');
    openBar();
    getFamily();

    // eslint-disable-next-line
  }, []);
  const [open, setOpen] = React.useState(false);
  const [openEdit, setEditOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleEditClose = () => {
    setEditOpen(false);
    clearCurrent();
  };
  const handleEditOpen = () => {
    setEditOpen(true);
  };
  const addChild = () => {
    setOpen(true);
  };

  return (
    <Grid container direction='column'>
      <Grid
        item
        container
        justify='flex-end'
        direction='column'
        alignItems='flex-end'
        className={classes.firstRow}
      >
        <IconButton
          edge='start'
          color='primary'
          aria-label='menu'
          className={classes.icon}
          onClick={addChild}
        >
          <AddCircleOutlineIcon
            style={{ fontSize: 40 }}
            color='secondary'
            className={classes.icon2}
          />
        </IconButton>
        <Typography color='primary'>Add Child</Typography>
      </Grid>
      <Grid item className={classes.firstRow}>
        <Card className={classes.root} variant='outlined'>
          <CardContent>
            {family !== null && !loading ? (
              <Grid container spacing={2} direction='column'>
                {family.map((child) => (
                  //Looping through family array and list Child Item Component

                  <Grid item key={child._id}>
                    <ChildCard
                      child={child}
                      setEditOpen={() => handleEditOpen()}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Spinner />
            )}
          </CardContent>
          <CardActions>
            <Button size='small' to='/user' component={Link}>
              Back
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <AddChild open={open} handleClose={() => handleClose()} />
      <EditChild open={openEdit} handleClose={() => handleEditClose()} />
    </Grid>
  );
};

Child.propTypes = {
  openBar: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  family: PropTypes.array,
  loading: PropTypes.bool.isRequired,

  clearCurrent: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.users.isAuthenticated,
  family: state.family.family,
  loading: state.family.loading,
});
export default connect(mapStateToProps, {
  openBar,
  setTitle,
  getFamily,
  clearCurrent,
})(Child);
