import {
  ADD_ASSET,
  DELETE_ASSET,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_ASSET,
  ASSET_ERROR,
  GET_ASSETS,
  CLEAR_ASSETS,
} from './Types';
import axios from 'axios';

// Get Assets
export const getAssets = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/assets');
    dispatch({ type: GET_ASSETS, payload: res.data });
  } catch (err) {
    dispatch({ type: ASSET_ERROR, payload: err.response.msg });
  }
};

// Add Contact
export const addAsset = (asset) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/assets', asset, config);
    console.log(res);
    dispatch({
      type: ADD_ASSET,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: ASSET_ERROR, payload: err.response.msg });
  }
};
// Delete Asset
export const deleteAsset = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/assets/${id}`);
    dispatch({ type: DELETE_ASSET, payload: id });
  } catch (err) {
    dispatch({ type: ASSET_ERROR, payload: err.response.msg });
  }
};

// Set Current Asset
export const setCurrent = (asset) => (dispatch) => {
  dispatch({
    type: SET_CURRENT,
    payload: asset,
  });
};
// Clear Current Contact
export const clearCurrent = () => ({ type: CLEAR_CURRENT });
// Update Contact
export const updateAsset = (asset) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.put(`/api/assets/${asset._id}`, asset, config);
    dispatch({ type: UPDATE_ASSET, payload: res.data });
  } catch (err) {
    dispatch({ type: ASSET_ERROR, payload: err.response.msg });
  }
};

// Clear Assets
export const clearAssets = () => ({ type: CLEAR_ASSETS });
