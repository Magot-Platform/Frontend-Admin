import api from '../utils/api';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  ADMIN_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from './types';
import msg from './msg.json';

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get('/authAdmin');

    dispatch({
      type: ADMIN_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User
export const register = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/admins', formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());

    return msg.register_success;

  } catch (err) {
    const error = err.response.data.error;

    dispatch({
      type: REGISTER_FAIL
    });

    return error;
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const body = { email, password };

  try {
    const res = await api.post('/authAdmin', body);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());

    return msg.login_success;

  } catch (err) {
    const error = err.response.data.error;

    dispatch({
      type: LOGIN_FAIL
    });

    return error;
  }

};

// Logout
export const logout = () => ({ type: LOGOUT });
