import React, { useState, useEffect } from 'react';
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

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import { addLoan } from '../../../actions/loanActions';
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

const AddLoan = ({ handleClose, open, addLoan, setAlert }) => {
  const classes = useStyles();

  const [loan, setLoan] = useState({
    name: '',
    amount: '',
    interest: '',
    maturity: '',
  });
  const { name, amount } = loan;
  const [selectedDate, setDateChange] = useState(new Date());

  useEffect(() => {
    setLoan({ ...loan, maturity: selectedDate });
    // eslint-disable-next-line
  }, [selectedDate]);

  const onChange = (e) => {
    setLoan({ ...loan, [e.target.name]: e.target.value });
  };

  const [interest, setInterest] = useState(0);

  const handleInterest = (event, newValue) => {
    setInterest(newValue);
    setLoan({ ...loan, interest: newValue });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (name === '') setAlert('Please fill in a name', 'error');
    else {
      addLoan(loan);
      handleClose(true);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>Add New Loan</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add all your Loans to be considered in your balance sheet and
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
          Add Loan
        </Button>
      </DialogActions>
      <Backdrop className={classes.backdrop} open={false}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </Dialog>
  );
};

AddLoan.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  addLoan: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {
  addLoan,
  setAlert,
})(AddLoan);
