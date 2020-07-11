import {
  ADD_LOAN,
  DELETE_LOAN,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_LOAN,
  LOAN_ERROR,
  GET_LOANS,
  CLEAR_LOANS,
} from './Types';
import axios from 'axios';

// Get Loans
export const getLoans = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/loans');
    //console.log(typeof res.data.loans[0].maturity);
    dispatch({ type: GET_LOANS, payload: res.data });
  } catch (err) {
    dispatch({ type: LOAN_ERROR, payload: err.response.data });
  }
};

// Add Loan
export const addLoan = (loan) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/loans', loan, config);

    dispatch({
      type: ADD_LOAN,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response.data);
    dispatch({ type: LOAN_ERROR, payload: err.response.data });
  }
};
// Delete Loan
export const deleteLoan = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/loans/${id}`);
    dispatch({ type: DELETE_LOAN, payload: id });
  } catch (err) {
    dispatch({ type: LOAN_ERROR, payload: err.response.data });
  }
};

// Set Current Loan
export const setCurrent = (loan) => (dispatch) => {
  dispatch({
    type: SET_CURRENT,
    payload: loan,
  });
};
// Clear Current Contact
export const clearCurrent = () => ({ type: CLEAR_CURRENT });
// Update Contact
export const editLoan = (loan) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.put(`/api/loans/${loan.id}`, loan, config);
    dispatch({ type: UPDATE_LOAN, payload: res.data });
  } catch (err) {
    dispatch({ type: LOAN_ERROR, payload: err.response.data });
  }
};

// Clear Loans
export const clearLoans = () => ({ type: CLEAR_LOANS });
