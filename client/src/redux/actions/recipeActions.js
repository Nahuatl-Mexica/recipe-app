import axios from 'axios';
import { getRecipes, getRecipe, addRecipe, updateRecipe, deleteRecipe, recipeError } from '../slices/recipeSlice';
import { setAlert } from '../slices/alertSlice';
import { v4 as uuidv4 } from 'uuid';

// Get all recipes
export const fetchRecipes = (params = {}) => async dispatch => {
  try {
    const queryString = Object.keys(params)
      .filter(key => params[key])
      .map(key => `${key}=${params[key]}`)
      .join('&');
      
    const url = `/api/recipes${queryString ? `?${queryString}` : ''}`;
    const res = await axios.get(url);
    
    dispatch(getRecipes(res.data));
  } catch (err) {
    dispatch(recipeError(err.response?.data?.msg || 'Error fetching recipes'));
  }
};

// Get recipe by ID
export const fetchRecipe = id => async dispatch => {
  try {
    const res = await axios.get(`/api/recipes/${id}`);
    
    dispatch(getRecipe(res.data));
  } catch (err) {
    dispatch(recipeError(err.response?.data?.msg || 'Error fetching recipe'));
  }
};

// Create recipe
export const createRecipe = (formData, navigate) => async dispatch => {
  try {
    const res = await axios.post('/api/recipes', formData);
    
    dispatch(addRecipe(res.data));
    
    const alertId = uuidv4();
    dispatch(setAlert({
      id: alertId,
      msg: 'Recipe created successfully!',
      type: 'success'
    }));
    
    setTimeout(() => dispatch(removeAlert(alertId)), 5000);
    
    navigate('/dashboard');
  } catch (err) {
    dispatch(recipeError(err.response?.data?.msg || 'Error creating recipe'));
    
    const alertId = uuidv4();
    dispatch(setAlert({
      id: alertId,
      msg: err.response?.data?.msg || 'Error creating recipe',
      type: 'danger'
    }));
    
    setTimeout(() => dispatch(removeAlert(alertId)), 5000);
  }
};

// Update recipe
export const editRecipe = (id, formData, navigate) => async dispatch => {
  try {
    const res = await axios.put(`/api/recipes/${id}`, formData);
    
    dispatch(updateRecipe(res.data));
    
    const alertId = uuidv4();
    dispatch(setAlert({
      id: alertId,
      msg: 'Recipe updated successfully!',
      type: 'success'
    }));
    
    setTimeout(() => dispatch(removeAlert(alertId)), 5000);
    
    navigate('/dashboard');
  } catch (err) {
    dispatch(recipeError(err.response?.data?.msg || 'Error updating recipe'));
    
    const alertId = uuidv4();
    dispatch(setAlert({
      id: alertId,
      msg: err.response?.data?.msg || 'Error updating recipe',
      type: 'danger'
    }));
    
    setTimeout(() => dispatch(removeAlert(alertId)), 5000);
  }
};

// Delete recipe
export const removeRecipe = id => async dispatch => {
  try {
    await axios.delete(`/api/recipes/${id}`);
    
    dispatch(deleteRecipe(id));
    
    const alertId = uuidv4();
    dispatch(setAlert({
      id: alertId,
      msg: 'Recipe removed successfully!',
      type: 'success'
    }));
    
    setTimeout(() => dispatch(removeAlert(alertId)), 5000);
  } catch (err) {
    dispatch(recipeError(err.response?.data?.msg || 'Error deleting recipe'));
    
    const alertId = uuidv4();
    dispatch(setAlert({
      id: alertId,
      msg: err.response?.data?.msg || 'Error deleting recipe',
      type: 'danger'
    }));
    
    setTimeout(() => dispatch(removeAlert(alertId)), 5000);
  }
};

// Rate recipe
export const rateRecipe = (id, value) => async dispatch => {
  try {
    const res = await axios.post(`/api/recipes/${id}/rate`, { value });
    
    dispatch(updateRecipe(res.data));
    
    const alertId = uuidv4();
    dispatch(setAlert({
      id: alertId,
      msg: 'Rating submitted successfully!',
      type: 'success'
    }));
    
    setTimeout(() => dispatch(removeAlert(alertId)), 5000);
  } catch (err) {
    dispatch(recipeError(err.response?.data?.msg || 'Error rating recipe'));
    
    const alertId = uuidv4();
    dispatch(setAlert({
      id: alertId,
      msg: err.response?.data?.msg || 'Error rating recipe',
      type: 'danger'
    }));
    
    setTimeout(() => dispatch(removeAlert(alertId)), 5000);
  }
};

// Add to favorites
export const addToFavorites = id => async dispatch => {
  try {
    await axios.post(`/api/recipes/${id}/favorite`);
    
    const alertId = uuidv4();
    dispatch(setAlert({
      id: alertId,
      msg: 'Added to favorites!',
      type: 'success'
    }));
    
    setTimeout(() => dispatch(removeAlert(alertId)), 5000);
  } catch (err) {
    dispatch(recipeError(err.response?.data?.msg || 'Error adding to favorites'));
    
    const alertId = uuidv4();
    dispatch(setAlert({
      id: alertId,
      msg: err.response?.data?.msg || 'Error adding to favorites',
      type: 'danger'
    }));
    
    setTimeout(() => dispatch(removeAlert(alertId)), 5000);
  }
};

// Remove from favorites
export const removeFromFavorites = id => async dispatch => {
  try {
    await axios.delete(`/api/recipes/${id}/favorite`);
    
    const alertId = uuidv4();
    dispatch(setAlert({
      id: alertId,
      msg: 'Removed from favorites!',
      type: 'success'
    }));
    
    setTimeout(() => dispatch(removeAlert(alertId)), 5000);
  } catch (err) {
    dispatch(recipeError(err.response?.data?.msg || 'Error removing from favorites'));
    
    const alertId = uuidv4();
    dispatch(setAlert({
      id: alertId,
      msg: err.response?.data?.msg || 'Error removing from favorites',
      type: 'danger'
    }));
    
    setTimeout(() => dispatch(removeAlert(alertId)), 5000);
  }
};

// Remove alert
export const removeAlert = id => dispatch => {
  dispatch({
    type: 'alert/removeAlert',
    payload: id
  });
};
