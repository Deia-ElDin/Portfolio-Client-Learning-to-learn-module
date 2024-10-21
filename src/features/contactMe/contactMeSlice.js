import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contactsData: [],
  mediasData: [],
};

export const contactMeSlice = createSlice({
  name: 'contactme',
  initialState,
  reducers: {
    setContactsData: (state, action) => {
      state.contactsData = action.payload;
    },
    setMediasData: (state, action) => {
      state.mediasData = action.payload;
    },
  },
});

export const selectContactsData = (state) => state.contactMe.contactsData;
export const selectMediasData = (state) => state.contactMe.mediasData;

export const { setContactsData, setMediasData } = contactMeSlice.actions;

export default contactMeSlice.reducer;
