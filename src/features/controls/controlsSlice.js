import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loginForm: false,
  profileForm: false,
  skillForm: false,
  jobForm: false,
  projectForm: false,
  fetchForm: false,
  contactForm: false,
  mediaForm: false,
};

const controlsSlice = createSlice({
  name: 'controls',
  initialState,
  reducers: {
    toggleLoginForm: (state) => {
      state.loginForm = !state.loginForm;
    },
    setLoginForm: (state, action) => {
      state.loginForm = action.payload;
    },
    toggleProfileForm: (state) => {
      state.profileForm = !state.profileForm;
    },
    setProfileForm: (state, action) => {
      state.profileForm = action.payload;
    },
    toggleSkillForm: (state) => {
      state.skillForm = !state.skillForm;
    },
    setSkillForm: (state, action) => {
      state.skillForm = action.payload;
    },
    toggleJobForm: (state) => {
      state.jobForm = !state.jobForm;
    },
    setJobForm: (state, action) => {
      state.jobForm = action.payload;
    },
    toggleProjectForm: (state) => {
      state.projectForm = !state.projectForm;
    },
    setProjectForm: (state, action) => {
      state.projectForm = action.payload;
    },
    toggleFetchForm: (state) => {
      state.fetchForm = !state.fetchForm;
    },
    setFetchForm: (state, action) => {
      state.fetchForm = action.payload;
    },
    toggleContactForm: (state) => {
      state.contactForm = !state.contactForm;
    },
    setContactForm: (state, action) => {
      state.contactForm = action.payload;
    },
    toggleMediaForm: (state) => {
      state.mediaForm = !state.mediaForm;
    },
    setMediaForm: (state, action) => {
      state.mediaForm = action.payload;
    },
  },
});

export const selectProfileForm = (state) => state.controls.profileForm;
export const selectLoginForm = (state) => state.controls.loginForm;
export const selectSkillForm = (state) => state.controls.skillForm;
export const selectJobForm = (state) => state.controls.jobForm;
export const selectProjectForm = (state) => state.controls.projectForm;
export const selectFetchForm = (state) => state.controls.fetchForm;
export const selectContactForm = (state) => state.controls.contactForm;
export const selectMediaForm = (state) => state.controls.mediaForm;

export const {
  toggleProfileForm,
  setProfileForm,
  toggleLoginForm,
  setLoginForm,
  toggleSkillForm,
  setSkillForm,
  toggleJobForm,
  setJobForm,
  toggleProjectForm,
  setProjectForm,
  toggleFetchForm,
  setFetchForm,
  toggleContactForm,
  setContactForm,
  toggleMediaForm,
  setMediaForm,
} = controlsSlice.actions;

export default controlsSlice.reducer;
