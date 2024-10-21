export const mockProfileData = [
  {
    _id: '6321c604587eb4a8d158306b',
    profilePic: { data: { data: 'img' } },
    __v: 0,
  },
];

export const mockSkillsData = [
  {
    _id: '63109cc8b631e5282aa3bd91',
    name: 'html 5',
    svgLink: 'https://www.svgrepo.com/show/349402/html5.svg',
    percentage: 90,
    __v: 0,
  },
  {
    _id: '6310a074b631e5282aa3bd96',
    name: 'css 3',
    svgLink: 'https://www.svgrepo.com/show/349330/css3.svg',
    percentage: 85,
    __v: 0,
  },
];

export const mockJobsData = [
  {
    _id: '631334f303eaeddda2ac2d67',
    countryName: 'egypt',
    countrySVGLink: 'https://www.svgrepo.com/show/241265/egypt.svg',
    companyName: 'Te Data',
    jobTitle: 'Technical Support',
    jobDescription: 'Internet technical support by phone',
    startingDate: '2013',
    finishingDate: '2016',
    __v: 0,
  },
  {
    _id: '6313363003eaeddda2ac2d78',
    countryName: 'UAE',
    countrySVGLink:
      'https://www.svgrepo.com/show/241296/united-arab-emirates.svg',
    companyName: 'ICAD Residential City',
    jobTitle: 'Safety Engineer',
    jobDescription: 'Handling the safety issues regarding the workers/shops',
    startingDate: '2018',
    finishingDate: '2019',
    __v: 0,
  },
];

export const projectsData = [
  {
    _id: '63253cde651c054c7540b618',
    projectName: 'CourseTube-V4',
    commercial: true,
    responsive: true,
    rating: 4.2,
    projectImg: { data: { data: 'img1' } },
    technologies: '{"html 5": 1000, "css 3": 1000}',
    sumCodeLines: 2000,
    ui: true,
    uiDownloadLink:
      'https://github.com/DeiaHamad/Project-7-CourseTube-V4-UI/tree/master',
    uiLiveDemoLink: 'https://deiahamad.github.io/Project-7-CourseTube-V4-UI/',
    uiPackageJson:
      '{"@reduxjs/toolkit": "^1.8.4","axios": "^0.27.2","emailjs-com": "^3.2.0","prop-types": "^15.8.1","react": "^18.2.0","react-dom": "^18.2.0","react-icons": "^4.4.0","react-redux": "^8.0.2","react-router-dom": "^6.3.0","react-scripts": "5.0.1","react-speech-recognition": "^3.9.1"}',
    server: true,
    serverDownloadLink:
      'https://github.com/DeiaHamad/Project-7-CourseTube-V4-Server',
    serverLiveDemoLink: '',
    serverPackageJson:
      '{"bcryptjs": "^2.4.3","cookie-parser": "^1.4.6","cors": "^2.8.5","date-fns": "^2.29.1","dotenv": "^16.0.1","express": "^4.18.1","express-async-errors": "^3.1.1","express-rate-limit": "^6.5.1","helmet": "^5.1.1","http-status-codes": "^2.2.0","jsonwebtoken": "^8.5.1","mongoose": "^6.5.2","uuid": "^8.3.2","xss-clean": "^0.1.1"}',
    testedWith: '{"Chrome": true, "Safari": true}',
    startingDate: 'August 1, 2022',
    finishingDate: 'August 23, 2022',
    duration: 22,
    createdAt: '2022-09-17T03:13:46.192Z',
    __v: 0,
  },
  {
    _id: '63245859cb9e89645bcc5aeb',
    projectName: 'CourseTube-V3',
    commercial: false,
    responsive: false,
    rating: 3.5,
    projectImg: { data: { data: 'img2' } },
    technologies: '{"html 5": 500, "css 3": 500}',
    sumCodeLines: 1000,
    ui: true,
    uiDownloadLink:
      'https://github.com/DeiaHamad/Project-6-CourseTube-Version-3/tree/master',
    uiLiveDemoLink:
      'https://deiahamad.github.io/Project-6-CourseTube-Version-3/',
    uiPackageJson:
      '{"@reduxjs/toolkit": "^1.8.3","@testing-library/jest-dom": "^5.16.4","@testing-library/react": "^13.3.0","@testing-library/user-event": "^13.5.0","emailjs-com": "^3.2.0","prop-types": "^15.8.1","react": "^18.2.0","react-dom": "^18.2.0","react-icons": "^4.4.0","react-redux": "^8.0.2","react-scripts": "5.0.1","react-speech-recognition": "^3.9.1"}',
    server: false,
    serverDownloadLink: '',
    serverLiveDemoLink: '',
    serverPackageJson: '',
    testedWith: '',
    startingDate: 'July 22, 2022',
    finishingDate: 'July 30, 2022',
    duration: 8,
    createdAt: '2022-09-16T03:14:05.594Z',
    __v: 0,
  },
];

export const mockProjectsData = (params) => {
  const sort = params.get('sort');
  const projectName = params.get('projectName');
  const version = params.get('version');
  const rating = params.get('rating');
  const commercial = params.get('commercial');
  const responsive = params.get('responsive');
  const frontEnd = params.get('frontEnd');
  const backEnd = params.get('backEnd');
  const fullStack = params.get('fullStack');
  const technologies = params.get('technologies');
  const testedWith = params.get('testedWith');
  const duration = params.get('duration');
  const year = params.get('year');

  const courseTubeV4 = projectsData[0];
  const courseTubeV3 = projectsData[1];

  if (
    !sort &&
    !projectName &&
    !version &&
    !rating &&
    !commercial &&
    !responsive &&
    !frontEnd &&
    !backEnd &&
    !fullStack &&
    !technologies &&
    !testedWith &&
    !duration &&
    !year
  ) {
    // in this case we sort by -createdAt (default case)
    // Note: projectsData[0] created after projectsData[1]
    return [courseTubeV4, courseTubeV3];
  }
  if (sort) {
    if (sort.includes('projectName')) {
      if (sort.includes('-')) return [courseTubeV4, courseTubeV3];
      else return [courseTubeV3, courseTubeV4];
    }
    if (sort.includes('sumCodeLines')) {
      if (sort.includes('-')) return [courseTubeV4, courseTubeV3];
      else return [courseTubeV3, courseTubeV4];
    }
    if (sort.includes('rating')) {
      if (sort.includes('-')) return [courseTubeV4, courseTubeV3];
      else return [courseTubeV3, courseTubeV4];
    }
    if (sort.includes('createdAt')) {
      if (sort.includes('-')) return [courseTubeV4, courseTubeV3];
      else return [courseTubeV3, courseTubeV4];
    }
    if (sort.includes('duration')) {
      if (sort.includes('-')) return [courseTubeV4, courseTubeV3];
      else return [courseTubeV3, courseTubeV4];
    }
  }
  if (projectName || version) {
    if (projectName && version) {
      if (projectName === 'CourseTube' && version === 'v3') {
        return [courseTubeV3];
      } else if (projectName === 'CourseTube' && version === 'v4') {
        return [courseTubeV4];
      }
    } else if (projectName) {
      if (projectName === 'CourseTube') return [courseTubeV4, courseTubeV3];
    }
  }
  if (rating) return [courseTubeV4, courseTubeV3];
  if (commercial) {
    if (commercial.includes('true')) return [courseTubeV4];
    else return [courseTubeV3];
  }
  if (responsive) {
    if (responsive.includes('true')) return [courseTubeV4];
    else return [courseTubeV3];
  }
  if (frontEnd) return [courseTubeV3];
  if (fullStack) return [courseTubeV4];
  if (testedWith) return [courseTubeV4];
};

export const mockContactsData = [
  {
    _id: '632080605956b359d6a7dc76',
    name: 'Location',
    svgLink: 'https://www.svgrepo.com/show/40718/location.svg',
    info: 'Abu Dhabi - United Arab Emirates',
    __v: 0,
  },
  {
    _id: '63208ef75956b359d6a7dcbd',
    name: 'Education',
    svgLink: 'https://www.svgrepo.com/show/296909/mortarboard-education.svg',

    info: 'Institute of Aviation Engineering & Technology - Egypt',
    __v: 0,
  },
];

export const mockMediasData = [
  {
    _id: '632094265956b359d6a7dcdd',
    name: 'linkedin',
    svgLink: 'https://www.svgrepo.com/show/157006/linkedin.svg',
    link: 'https://www.linkedin.com/in/deia-hamad-577a1814a/',
    __v: 0,
  },
  {
    _id: '632096ed5956b359d6a7dce2',
    name: 'github',
    svgLink: 'https://www.svgrepo.com/show/217753/github.svg',
    link: 'https://www.github.com/DeiaHamad',
    __v: 0,
  },
];

export const mockErrMsg = (msg) => {
  const msgAfterEdit = msg
    .split('.')
    .map((text) => text.replace('Must provide ', ''))
    .slice(0, -1)
    .join(', ');

  return `Must provide ${msgAfterEdit}`;
};

export const mockLoginErr = (username, password) => {
  let msg;
  if (!username && !password) msg = 'Must provide username and password';
  else if (!username) msg = 'Must provide username';
  else if (!password) msg = 'Must provide password';
  else msg = 'Invalid Credentials';

  return msg;
};

export const mockSkillsErr = (name, svgLink, percentage) => {
  let msg = '';
  if (!name) msg += 'Must provide the technology name.';
  if (!svgLink) msg += 'Must provide the technology svg link.';
  if (!percentage) msg += 'Must provide the technology percentage.';

  return mockErrMsg(msg);
};

export const mockJobsErr = (
  countryName,
  countrySVGLink,
  companyName,
  jobTitle,
  jobDescription,
  startingDate,
  finishingDate
) => {
  let msg = '';
  if (!countryName) msg += 'Must provide the country name.';
  if (!countrySVGLink) msg += 'Must provide the country flag.';
  if (!companyName) msg += 'Must provide the company name.';
  if (!jobTitle) msg += 'Must provide the job title.';
  if (!jobDescription) msg += 'Must provide the job description.';
  if (!startingDate) msg += 'Must provide the starting date.';
  if (!finishingDate) msg += 'Must provide the finishing date.';

  return mockErrMsg(msg);
};

export const mockContactsErr = (name, svgLink, info) => {
  let msg = '';
  if (!name) msg += 'Must provide a contact.';
  if (!svgLink) msg += 'Must provide the contact svg link.';
  if (!info) msg += 'Must provide the contact information.';

  return mockErrMsg(msg);
};

export const mockMediasErr = (name, svgLink, link) => {
  let msg = '';
  if (!name) msg += 'Must provide a social media.';
  if (!svgLink) msg += 'Must provide the social media svg link.';
  if (!link) msg += 'Must provide the social media link.';

  return mockErrMsg(msg);
};
