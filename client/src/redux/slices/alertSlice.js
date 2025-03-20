import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  alerts: []
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, action) => {
      const { id, msg, type } = action.payload;
      state.alerts = [...state.alerts, { id, msg, type }];
    },
    removeAlert: (state, action) => {
      state.alerts = state.alerts.filter(alert => alert.id !== action.payload);
    }
  }
});

export const { setAlert, removeAlert } = alertSlice.actions;

export default alertSlice.reducer;
