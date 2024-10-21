import { createSlice } from '@reduxjs/toolkit';
import {
  chromeSvg,
  firefoxSvg,
  safariSvg,
} from '../helpers/srcs/handleImgsSrc';

const initialState = {
  projectsData: [],
  totalProjects: 0,
  browserData: [
    { name: 'Chrome', svgLink: chromeSvg },
    { name: 'Firefox', svgLink: firefoxSvg },
    { name: 'Safari', svgLink: safariSvg },
  ],
  sortData: [
    { name: 'Project Name', id: 'projectName' },
    { name: 'Project Size', id: 'sumCodeLines' },
    { name: 'Rating', id: 'rating' },
    { name: 'Duration', id: 'duration' },
    { name: 'Created At', id: 'createdAt' },
    { name: 'Year', id: 'year' },
  ],
  symbolsData: [
    { name: '>=' },
    { name: '>' },
    { name: '=' },
    { name: '<' },
    { name: '<=' },
  ],
  projectsList: [],
  queryBtns: {
    allProjects: 'active-query',
    mernStack: 'query-btn',
    reactJs: 'query-btn',
    javascript: 'query-btn',
  },
  featuresSwitchBtn: true,
  durationSwitchBtn: true,
};

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    setProjectsData: (state, action) => {
      state.projectsData = action.payload;
    },
    setTotalProjects: (state, action) => {
      state.totalProjects = action.payload;
    },
    setProjectsList: (state, action) => {
      state.projectsList = action.payload;
    },
    setQueryBtns: (state, action) => {
      if (action.payload !== 'off') {
        state.queryBtns = {
          allProjects: 'query-btn',
          mernStack: 'query-btn',
          reactJs: 'query-btn',
          javascript: 'query-btn',
          [action.payload]: 'active-query',
        };
      } else {
        state.queryBtns = {
          allProjects: 'query-btn',
          mernStack: 'query-btn',
          reactJs: 'query-btn',
          javascript: 'query-btn',
        };
      }
    },
    setFeaturesSwitchBtn: (state, action) => {
      state.featuresSwitchBtn = action.payload;
    },
    setDurationSwitchBtn: (state, action) => {
      state.durationSwitchBtn = action.payload;
    },
  },
});

export const selectProjectsData = (state) => state.portfolio.projectsData;
export const selectTotalProjects = (state) => state.portfolio.totalProjects;
export const selectBrowsersData = (state) => state.portfolio.browserData;
export const selectSortData = (state) => state.portfolio.sortData;
export const selectSymbolsData = (state) => state.portfolio.symbolsData;
export const selectProjectsList = (state) => state.portfolio.projectsList;
export const selectQueryBtns = (state) => state.portfolio.queryBtns;
export const selectFeaturesSwitchBtn = (state) =>
  state.portfolio.featuresSwitchBtn;
export const selectDurationSwitchBtn = (state) =>
  state.portfolio.durationSwitchBtn;

export const {
  setProjectsData,
  setTotalProjects,
  setProjectsList,
  setQueryBtns,
  setFeaturesSwitchBtn,
  setDurationSwitchBtn,
} = portfolioSlice.actions;

export default portfolioSlice.reducer;
