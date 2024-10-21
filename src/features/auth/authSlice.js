import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { username: null, accessToken: null },
  reducers: {
    setCredentials: (state, action) => {
      const { username, accessToken } = action.payload;
      state.username = username;
      state.accessToken = accessToken;
    },
    logout: (state, action) => {
      state.username = null;
      state.accessToken = null;
    },
  },
});

export const selectUsername = (state) => state.auth.username;
export const selectAccessToken = (state) => state.auth.accessToken;

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
