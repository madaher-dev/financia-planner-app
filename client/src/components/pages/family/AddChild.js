import React, { useState } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import { addChild } from '../../../actions/childActions';
import { setAlert } from '../../../actions/alertActions';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
    },
  },
  title: {
    paddingBottom: 30,
    paddingTop: 10,
  },
}));

const AddChild = ({ handleClose, open, addChild, setAlert }) => {
  const classes = useStyles();

  const [child, setChild] = useState({
    name: '',
    age: '',
    school: '',
    uni: '',
  });
  const { name, age, school, uni } = child;
  const onChange = (e) => {
    setChild({ ...child, [e.target.name]: e.target.value });
  };
  const clearChild = () => {
    setChild({
      name: '',
      age: '',
      school: '',
      uni: '',
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    if (name === '') setAlert('Please fill in a name', 'error');
    else {
      addChild(child);
      handleClose(true);
      clearChild();
    }
  };

  const clearAndClose = () => {
    handleClose(true);
    clearChild();
  };

  return (
    <Dialog
      open={open}
      onClose={clearAndClose}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>Add New Child</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add all your Children to be considered in your balance sheet and
          financial report.
        </DialogContentText>

        <TextField
          margin='dense'
          id='name'
          name='name'
          label='Name'
          type='text'
          value={name}
          onChange={onChange}
          fullWidth
          required
        />

        <TextField
          margin='dense'
          id='age'
          name='age'
          label='Age'
          type='number'
          value={age}
          InputProps={{
            inputProps: {
              max: 40,
              min: 0,
            },
          }}
          onChange={onChange}
          fullWidth
        />
        <TextField
          margin='dense'
          id='school'
          name='school'
          label='School Cost/Year'
          type='number'
          value={school}
          onChange={onChange}
          fullWidth
        />
        <TextField
          margin='dense'
          id='uni'
          name='uni'
          label='University Cost/Year'
          type='number'
          value={uni}
          onChange={onChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={clearAndClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={onSubmit} color='primary'>
          Add Child
        </Button>
      </DialogActions>
      <Backdrop className={classes.backdrop} open={false}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </Dialog>
  );
};

AddChild.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  addChild: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {
  addChild,
  setAlert,
})(AddChild);
