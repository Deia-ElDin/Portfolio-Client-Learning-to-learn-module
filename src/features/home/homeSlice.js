import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profilePicData: [],
  profilePicId: '',
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setProfilePicData: (state, action) => {
      state.profilePicData = action.payload;
    },
    setProfilePicId: (state, action) => {
      state.profilePicId = action.payload;
    },
  },
});

export const selectProfilePicData = (state) => state.home.profilePicData;
export const selectProfilePicId = (state) => state.home.profilePicId;

export const { setProfilePicData, setProfilePicId } = homeSlice.actions;

export default homeSlice.reducer;
