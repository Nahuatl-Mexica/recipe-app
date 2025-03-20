import axios from 'axios';
import { setAlert } from '../slices/alertSlice';
import { v4 as uuidv4 } from 'uuid';

// Get user profile
export const getUserProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/users/me');
    
    return res.data;
  } catch (err) {
    const alertId = uuidv4();
    dispatch(setAlert({
      id: alertId,
      msg: err.response?.data?.msg || 'Error fetching profile',
      type: 'danger'
    }));
    
    setTimeout(() => dispatch(removeAlert(alertId)), 5000);
    return null;
  }
};

// Update user profile
export const updateProfile = formData => async dispatch => {
  try {
    const res = await axios.put('/api/users/profile', formData);
    
    const alertId = uuidv4();
    dispatch(setAlert({
      id: alertId,
      msg: 'Profile updated successfully!',
      type: 'success'
    }));
    
    setTimeout(() => dispatch(removeAlert(alertId)), 5000);
    
    return res.data;
  } catch (err) {
    const alertId = uuidv4();
    dispatch(setAlert({
      id: alertId,
      msg: err.response?.data?.msg || 'Error updating profile',
      type: 'danger'
    }));
    
    setTimeout(() => dispatch(removeAlert(alertId)), 5000);
    return null;
  }
};

// Change password
export const changePassword = passwordData => async dispatch => {
  try {
    await axios.put('/api/users/password', passwordData);
    
    const alertId = uuidv4();
    dispatch(setAlert({
      id: alertId,
      msg: 'Password updated successfully!',
      type: 'success'
    }));
    
    setTimeout(() => dispatch(removeAlert(alertId)), 5000);
    
    return true;
  } catch (err) {
    const alertId = uuidv4();
    dispatch(setAlert({
      id: alertId,
      msg: err.response?.data?.msg || 'Error updating password',
      type: 'danger'
    }));
    
    setTimeout(() => dispatch(removeAlert(alertId)), 5000);
    return false;
  }
};

// Get user recipes
export const getUserRecipes = () => async dispatch => {
  try {
    const res = await axios.get('/api/users/recipes');
    
    return res.data;
  } catch (err) {
    const alertId = uuidv4();
    dispatch(setAlert({
      id: alertId,
      msg: err.response?.data?.msg || 'Error fetching your recipes',
      type: 'danger'
    }));
    
    setTimeout(() => dispatch(removeAlert(alertId)), 5000);
    return [];
  }
};

// Get user favorites
export const getUserFavorites = () => async dispatch => {
  try {
    const res = await axios.get('/api/users/favorites');
    
    return res.data;
  } catch (err) {
    const alertId = uuidv4();
    dispatch(setAlert({
      id: alertId,
      msg: err.response?.data?.msg || 'Error fetching favorites',
      type: 'danger'
    }));
    
    setTimeout(() => dispatch(removeAlert(alertId)), 5000);
    return [];
  }
};

// Remove alert
export const removeAlert = id => dispatch => {
  dispatch({
    type: 'alert/removeAlert',
    payload: id
  });
};
