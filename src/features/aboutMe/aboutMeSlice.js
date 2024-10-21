import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  skillsData: [],
  jobsData: [],
  countriesData: [],
};

export const aboutMeSlice = createSlice({
  name: 'aboutme',
  initialState,
  reducers: {
    setSkillsData: (state, action) => {
      state.skillsData = action.payload;
    },
    setJobsData: (state, action) => {
      state.jobsData = action.payload;
    },
    setCountriesData: (state, action) => {
      state.countriesData = action.payload;
    },
  },
});

export const selectSkillsData = (state) => state.aboutMe.skillsData;
export const selectJobsData = (state) => state.aboutMe.jobsData;
export const selectCountriesData = (state) => state.aboutMe.countriesData;

export const { setSkillsData, setJobsData, setCountriesData } =
  aboutMeSlice.actions;

export default aboutMeSlice.reducer;
