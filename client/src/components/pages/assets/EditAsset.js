import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import { editAsset } from '../../../actions/assetActions';
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

const EditAsset = ({ handleClose, open, editAsset, setAlert, current }) => {
  const classes = useStyles();
  const [assetToEdit, setAsset] = useState({
    name: '',
    amount: '',
    type: '',
    returnValue: 0,
    id: '',
  });
  //Setting form data on form open
  React.useEffect(
    () => {
      if (current) {
        setAsset({
          name: current.name,
          amount: current.amount,
          type: current.type,
          id: current._id,
        });
        setReturn(current.returnValue);
      }
    },

    // eslint-disable-next-line
    [current]
  );

  const { name, amount, type } = assetToEdit;
  const onChange = (e) => {
    setAsset({ ...assetToEdit, [e.target.name]: e.target.value });
  };

  const [returnValue, setReturn] = useState(0);
  const handleReturn = (event, newValue) => {
    setReturn(newValue);
    setAsset({ ...assetToEdit, returnValue: newValue });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    //setAsset({ ...asset, [returnValue]: returnValue });
    // setLoading();
    if (name === '') setAlert('Please fill in a name', 'error');
    else {
      editAsset(assetToEdit);
      handleClose(true);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>Add New Asset</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add all your Assets to be considered in your balance sheet and
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
          id='amount'
          name='amount'
          label='Amount'
          type='number'
          value={amount}
          onChange={onChange}
          fullWidth
        />
        <FormControl className={classes.formControl}>
          <InputLabel id='type-label'>Type</InputLabel>
          <Select
            labelId='type'
            name='type'
            id='type'
            value={type}
            onChange={onChange}
          >
            <MenuItem id='type' value={10}>
              Cash
            </MenuItem>
            <MenuItem id='type' value={20}>
              Logn Term Deposit
            </MenuItem>
            <MenuItem id='type' value={30}>
              Equities
            </MenuItem>
            <MenuItem id='type' value={40}>
              Real Estate
            </MenuItem>
          </Select>
        </FormControl>
        <Typography
          className={classes.title}
          color='textSecondary'
          gutterBottom
        >
          Return: {returnValue}%
        </Typography>

        <Slider
          id='returnValue'
          name='returnValue'
          value={returnValue}
          onChange={handleReturn}
          min={0}
          max={30}
          valueLabelDisplay='auto'
          color='secondary'
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={onSubmit} color='primary'>
          Update Asset
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditAsset.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  editAsset: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  current: PropTypes.object,
};

const mapStateToProps = (state) => ({
  current: state.assets.current,
});
export default connect(mapStateToProps, {
  editAsset,
  setAlert,
})(EditAsset);
