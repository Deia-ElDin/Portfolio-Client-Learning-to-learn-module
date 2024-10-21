import { createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../app/api/apiSlice';

const initialState = {
  baseUrl: BASE_URL,
  isServerErr: false,
  userFormOpacity: 0.7,
  formOpacity: 0.7,
  editId: '',
  editTarget: '',
  isEdditting: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsServerErr: (state, action) => {
      state.isServerErr = action.payload;
    },
    setFormOpacity: (state, action) => {
      state.formOpacity = action.payload;
    },
    setUserFormOpacity: (state, action) => {
      state.userFormOpacity = action.payload;
    },
    setEditId: (state, action) => {
      state.editId = action.payload;
    },
    setEditTarget: (state, action) => {
      state.editTarget = action.payload;
    },
    setIsEdditting: (state, action) => {
      state.isEdditting = action.payload;
    },
  },
});

export const selectBaseUrl = (state) => state.app.baseUrl;
export const selectIsServerErr = (state) => state.app.isServerErr;
export const selectFormOpacity = (state) => state.app.formOpacity;
export const selectUserFormOpacity = (state) => state.app.userFormOpacity;
export const selectEditId = (state) => state.app.editId;
export const selectEditTarget = (state) => state.app.editTarget;
export const selectIsEdditting = (state) => state.app.isEdditting;

export const {
  setIsServerErr,
  setContacts,
  setSocialMedias,
  setFormOpacity,
  setUserFormOpacity,
  setEditId,
  setEditTarget,
  setIsEdditting,
} = appSlice.actions;

export default appSlice.reducer;
