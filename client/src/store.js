import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux/slices/authSlice';
import recipeReducer from './redux/slices/recipeSlice';
import alertReducer from './redux/slices/alertSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipeReducer,
    alert: alertReducer
  }
});

export default store;
