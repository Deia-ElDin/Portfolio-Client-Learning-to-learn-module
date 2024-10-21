import { IoMdHome, IoMdCodeWorking } from 'react-icons/io';
import { loginSvg } from '../srcs/handleImgsSrc';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';
import { RiContactsFill } from 'react-icons/ri';
import { MdContacts } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import { ImProfile } from 'react-icons/im';
import { GiSkills } from 'react-icons/gi';
import { MdImportContacts } from 'react-icons/md';

export const btns = [
  {
    name: 'login',
    icon: <img src={loginSvg} alt="log in" />,
  },
  {
    name: 'logout',
    icon: <FiLogOut className="control-icon" />,
  },
  {
    name: 'home',
    icon: <IoMdHome className="control-icon" />,
  },
  {
    name: 'profile',
    icon: <ImProfile className="control-icon" />,
  },
  {
    name: 'aboutMe',
    icon: <RiContactsFill className="control-icon" />,
  },
  {
    name: 'details',
    icon: <GiSkills className="control-icon" />,
  },
  {
    name: 'portfolio',
    icon: <AiOutlineFundProjectionScreen className="control-icon" />,
  },
  {
    name: 'project',
    icon: <IoMdCodeWorking className="control-icon" />,
  },
  {
    name: 'contactMe',
    icon: <MdContacts className="control-icon" />,
  },
  {
    name: 'contacts',
    icon: <MdImportContacts className="control-icon" />,
  },
];

export const mirrors = [
  ['login', 'logout'],
  ['home', 'profile'],
  ['aboutMe', 'details'],
  ['portfolio', 'project'],
  ['contactMe', 'contacts'],
];

export const mainBtnsInitialState = [
  'login',
  'home',
  'aboutMe',
  'portfolio',
  'contactMe',
];

export const secondaryBtnsInitialState = [
  'logout',
  'profile',
  'details',
  'project',
  'contacts',
];

export const profileInitialState = {
  id: '',
  profilePic: '',
};

export const skillInitialState = {
  id: '',
  name: '',
  svgLink: '',
  percentage: '',
};

export const jobInitialState = {
  id: '',
  countryName: '',
  countrySVGLink: '',
  companyName: '',
  jobTitle: '',
  jobDescription: '',
  startingDate: '',
  finishingDate: '',
};

export const projectInitialState = (editId) => ({
  id: editId ? editId : null,
  projectName: '',
  rating: '',
  projectImg: '',
  commercial: false,
  responsive: false,
  technologies: '',
  uiLiveDemoLink: '',
  uiDownloadLink: '',
  uiPackageJson: '',
  serverLiveDemoLink: '',
  serverDownloadLink: '',
  serverPackageJson: '',
  testedWith: '',
  startingDate: '',
  finishingDate: '',
});

export const switchBtnsInitialState = {
  img: false,
  tech: false,
  ui: false,
  server: false,
  test: false,
};

const setMultiInputsInitialState = (data) => {
  const initialState = data.map((item) => {
    if (
      item.name === 'Chrome' ||
      item.name === 'Firefox' ||
      item.name === 'Safari'
    ) {
      return { inputName: item.name, checked: false };
    } else return { inputName: item.name, value: '' };
  });
  return initialState;
};

export const techInitialState = (data) => {
  return setMultiInputsInitialState(data);
};

export const testInitialState = (data) => {
  return setMultiInputsInitialState(data);
};

export const tableBtnsInitialState = {
  tech: true,
  ui: false,
  server: false,
};

export const queriesInitialState = {
  sort: '',
  projectName: '',
  version: '',
  rating: '',
  commercial: '',
  responsive: '',
  frontEnd: '',
  backEnd: '',
  fullStack: '',
  technologies: '',
  testedWith: '',
  duration: '',
  year: '',
};

export const displayQueriesInitialState = {
  displaySort: false,
  displayProjectName: false,
  displayVersion: false,
  displayRating: false,
  displayCommercial: false,
  displayResponsive: false,
  displayFrontEnd: false,
  displayBackEnd: false,
  displayFullStack: false,
  displayTechnologies: false,
  displayTestedWith: false,
  displayDuration: false,
  displayYear: false,
};

export const sortOptionsInitialState = (data) => {
  return data.map((item) => {
    return { name: item.name, id: item.id, selected: false, value: '' };
  });
};

export const sortBtnsInitialState = (data) => {
  return data.map((item) => {
    return { id: `${item.id}Btn`, state: 'active' };
  });
};

export const queriesBtnsInitialState = {
  commercial: { commercialTrueBtn: 'normal', commercialFalseBtn: 'normal' },
  responsive: { responsiveTrueBtn: 'normal', responsiveFalseBtn: 'normal' },
  frontEnd: { frontEndTrueBtn: 'normal' },
  backEnd: { backEndTrueBtn: 'normal' },
  fullStack: { fullStackTrueBtn: 'normal' },
};

export const ratingAndDurationInitialState = [
  { inputName: '>=', value: '' },
  { inputName: '>', value: '' },
  { inputName: '=', value: '' },
  { inputName: '<', value: '' },
  { inputName: '<=', value: '' },
];

export const disableInitialState = [
  { inputName: '>=', value: false },
  { inputName: '>', value: false },
  { inputName: '=', value: false },
  { inputName: '<', value: false },
  { inputName: '<=', value: false },
];

export const queryTechInitialState = (data) => {
  return data.map((item) => {
    return { inputName: item.name, checked: false };
  });
};

export const contactInitialState = {
  id: '',
  name: '',
  svgLink: '',
  info: '',
};

export const mediaInitialState = {
  id: '',
  name: '',
  svgLink: '',
  link: '',
};

export const contactFormInitialState = {
  name: '',
  email: '',
  subject: '',
  message: '',
};
