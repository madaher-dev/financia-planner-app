import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import { editLoan } from '../../../actions/loanActions';
import { setAlert } from '../../../actions/alertActions';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

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

const EditLoan = ({ handleClose, open, editLoan, setAlert, current }) => {
  const classes = useStyles();
  const [loanToEdit, setLoan] = useState({
    name: '',
    amount: '',
    interest: 0,
    maturity: '',
    id: '',
  });
  //Setting form data on form open
  React.useEffect(
    () => {
      if (current) {
        setLoan({
          name: current.name,
          amount: current.amount,
          id: current._id,
        });
        setInterest(current.interest);
        setDateChange(current.maturity);
      }
    },

    // eslint-disable-next-line
    [current]
  );

  const { name, amount } = loanToEdit;
  const onChange = (e) => {
    setLoan({ ...loanToEdit, [e.target.name]: e.target.value });
  };

  const [selectedDate, setDateChange] = useState(new Date());
  const [interest, setInterest] = useState(0);

  const handleInterest = (event, newValue) => {
    setInterest(newValue);
    setLoan({ ...loanToEdit, returnValue: newValue });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (name === '') setAlert('Please fill in a name', 'error');
    else {
      editLoan(loanToEdit);
      handleClose(true);
    }
  };

  useEffect(() => {
    setLoan({ ...loanToEdit, maturity: selectedDate });
    // eslint-disable-next-line
  }, [selectedDate]);

  useEffect(() => {
    setLoan({ ...loanToEdit, interest: interest });
    // eslint-disable-next-line
  }, [interest]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>Edit Loan</DialogTitle>
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
          id='amount'
          name='amount'
          label='Amount'
          type='number'
          value={amount}
          onChange={onChange}
          fullWidth
        />
        <Typography
          className={classes.title}
          color='textSecondary'
          gutterBottom
        >
          Interest: {interest}%
        </Typography>

        <Slider
          id='interest'
          name='interest'
          value={interest}
          onChange={handleInterest}
          min={0}
          max={30}
          valueLabelDisplay='auto'
          color='secondary'
        />
        <Typography
          className={classes.title}
          color='textSecondary'
          gutterBottom
        >
          Maturity Year:
        </Typography>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            className={classes.date}
            value={selectedDate}
            onChange={setDateChange}
            views={['year']}
            autoOk
            minDate={new Date()}
            InputProps={{
              className: classes.input,
            }}
          />
        </MuiPickersUtilsProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={onSubmit} color='primary'>
          Update Loan
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditLoan.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  editLoan: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  current: PropTypes.object,
};

const mapStateToProps = (state) => ({
  current: state.loans.current,
});
export default connect(mapStateToProps, {
  editLoan,
  setAlert,
})(EditLoan);
