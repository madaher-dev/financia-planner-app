import React, { useState } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';

import { editChild } from '../../../actions/childActions';
import { setAlert } from '../../../actions/alertActions';

const EditChild = ({ handleClose, open, editChild, setAlert, current }) => {
  const [childToEdit, setChild] = useState({
    name: '',
    age: '',
    school: '',
    uni: '',
    id: '',
  });
  //Setting form data on form open
  React.useEffect(() => {
    if (current) {
      setChild({
        name: current.name,
        age: current.age,
        school: current.school,
        uni: current.uni,
        id: current._id,
      });
    }
  }, [current]);

  const { name, age, school, uni } = childToEdit;
  const onChange = (e) => {
    setChild({ ...childToEdit, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (name === '') setAlert('Please fill in a name', 'error');
    else {
      editChild(childToEdit);
      handleClose(true);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>Edit Child</DialogTitle>
      <DialogContent>
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
          onChange={onChange}
          InputProps={{
            inputProps: {
              max: 40,
              min: 0,
            },
          }}
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
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={onSubmit} color='primary'>
          Update Child
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditChild.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  editChild: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  current: PropTypes.object,
};

const mapStateToProps = (state) => ({
  current: state.family.current,
});
export default connect(mapStateToProps, {
  editChild,
  setAlert,
})(EditChild);
