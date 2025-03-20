import axios from 'axios';
import { userLoaded, authSuccess, authFail, logout } from '../slices/authSlice';
import { setAlert } from '../slices/alertSlice';
import { v4 as uuidv4 } from 'uuid';

// Set auth token in headers
export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

// Load User
export const loadUser = () => async dispatch => {
  const token = localStorage.getItem('token');
  
  if (token) {
    setAuthToken(token);
  }
  
  try {
    const res = await axios.get('/api/auth/user');
    dispatch(userLoaded(res.data));
  } catch (err) {
    dispatch(authFail(err.response?.data?.msg || 'Authentication failed'));
  }
};

// Register User
export const register = formData => async dispatch => {
  try {
    const res = await axios.post('/api/auth/register', formData);
    
    dispatch(authSuccess(res.data));
    dispatch(loadUser());
    
    const alertId = uuidv4();
    dispatch(setAlert({
      id: alertId,
      msg: 'Registration successful!',
      type: 'success'
    }));
    
    setTimeout(() => dispatch(removeAlert(alertId)), 5000);
  } catch (err) {
    dispatch(authFail(err.response?.data?.msg || 'Registration failed'));
    
    const alertId = uuidv4();
    dispatch(setAlert({
      id: alertId,
      msg: err.response?.data?.msg || 'Registration failed',
      type: 'danger'
    }));
    
    setTimeout(() => dispatch(removeAlert(alertId)), 5000);
  }
};

// Login User
export const login = formData => async dispatch => {
  try {
    const res = await axios.post('/api/auth/login', formData);
    
    dispatch(authSuccess(res.data));
    dispatch(loadUser());
    
    const alertId = uuidv4();
    dispatch(setAlert({
      id: alertId,
      msg: 'Login successful!',
      type: 'success'
    }));
    
    setTimeout(() => dispatch(removeAlert(alertId)), 5000);
  } catch (err) {
    dispatch(authFail(err.response?.data?.msg || 'Login failed'));
    
    const alertId = uuidv4();
    dispatch(setAlert({
      id: alertId,
      msg: err.response?.data?.msg || 'Login failed',
      type: 'danger'
    }));
    
    setTimeout(() => dispatch(removeAlert(alertId)), 5000);
  }
};

// Logout
export const logoutUser = () => dispatch => {
  dispatch(logout());
  
  const alertId = uuidv4();
  dispatch(setAlert({
    id: alertId,
    msg: 'You have been logged out',
    type: 'info'
  }));
  
  setTimeout(() => dispatch(removeAlert(alertId)), 5000);
};

// Remove alert
export const removeAlert = id => dispatch => {
  dispatch({
    type: 'alert/removeAlert',
    payload: id
  });
};
