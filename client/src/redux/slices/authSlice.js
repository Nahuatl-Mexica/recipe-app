import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoaded: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    },
    authSuccess: (state, action) => {
      localStorage.setItem('token', action.payload.token);
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
    },
    authFail: (state, action) => {
      localStorage.removeItem('token');
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem('token');
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const { userLoaded, authSuccess, authFail, logout, clearError } = authSlice.actions;

export default authSlice.reducer;
