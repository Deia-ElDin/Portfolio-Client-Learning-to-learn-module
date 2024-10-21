import { screen, within } from '@testing-library/react';

export const aboutMeElements = ({
  aboutMePage,
  titles,
  infos,
  skills,
  jobs,
  aboutMeForms,
  // skill form
  skillForm,
  skillFormInputs,
  skillFormBtns,
  // job form
  jobForm,
  jobFormInputs,
  jobFormBtns,
  // common elements
  opacitySlider,
  byeByeIcon,
}) => {
  const obj = {};

  if (aboutMePage) {
    obj.aboutMePage = screen.queryByRole('region', { name: /about me/i });
  }
  if (titles) {
    obj.pageTitle = screen.getByRole('heading', { name: /about me/i });
    obj.pageSubTitle = screen.getByRole('heading', { name: /my stats/i });
  }
  if (infos) {
    obj.infosSec = screen.getByRole('region', { name: 'Infos' });
    obj.firstParagraph = screen.getByText(
      /i started to learn coding in 2021 and found out it's my true passion, it's where I found myself the most./i
    );
    obj.secondParagraph = screen.getByText(
      /I like to build websites I enjoy the challenges that come with it. My goals are to focus on typography, content ,and conveying the message that you want to send./i
    );
    obj.infoBlock = screen.getAllByRole('region', { name: 'My stats' });
    obj.expImg = screen.getByRole('img', { name: /experience/i });
    obj.expTitle = screen.getByRole('heading', { name: 'Experience' });
    obj.clientsImg = screen.getByRole('img', { name: /clients/i });
    obj.clientsTitle = screen.getByRole('heading', { name: 'Clients' });
    obj.projectsImg = screen.getByRole('img', { name: /projects/i });
    obj.projectsTitle = screen.getByRole('heading', { name: 'Projects' });
  }
  if (skills) {
    obj.skillsSec = screen.getByRole('region', { name: 'Skills' });
    obj.skillsTitle = screen.getByText('Skills');
    obj.skillsList = screen.getByRole('region', { name: /skills list/i });
  }
  if (jobs) {
    obj.jobsSec = screen.getByRole('region', { name: 'Jobs' });
    obj.jobsTitle = screen.getByText('Work Experience');
    obj.jobsList = screen.getByRole('region', { name: /jobs list/i });
  }

  // skill form
  if (skillForm || aboutMeForms) {
    obj.skillForm = screen.queryByRole('form', { name: 'Skill form' });
  }
  if (skillFormInputs) {
    obj.skillNameLabel = screen.getByText('Skill Name:');
    obj.skillNameInput = screen.getByRole('textbox', { name: 'Skill Name:' });
    obj.svgLinkLabel = screen.getByText('SVG Link:');
    obj.svgLinkInput = screen.getByRole('textbox', { name: 'SVG Link:' });
    obj.percentageLabel = screen.getByText('Percentage:');
    obj.percentageInput = screen.getByRole('spinbutton', {
      name: 'Percentage:',
    });
  }
  if (skillFormBtns) {
    obj.createBtn = screen.queryByRole('button', { name: 'Create' });
    obj.updateBtn = screen.queryByRole('button', { name: 'Update' });
    obj.deleteBtn = screen.queryByRole('button', { name: 'Delete' });
  }

  // job form
  if (jobForm || aboutMeForms) {
    obj.jobForm = screen.queryByRole('form', { name: 'Job form' });
  }
  if (jobFormInputs) {
    obj.countryNameLabel = screen.getByText('Country Name:');
    obj.countryNameInput = screen.getByRole('textbox', {
      name: 'Country Name:',
    });
    obj.countrySvgLinkLabel = screen.getByText('Country Flag:');
    obj.countrySvgLinkInput = screen.getByRole('textbox', {
      name: 'Country Flag:',
    });
    obj.companyNameLabel = screen.getByText('Company Name:');
    obj.companyNameInput = screen.getByRole('textbox', {
      name: 'Company Name:',
    });
    obj.jobTitleLabel = screen.getByText('Job Title:');
    obj.jobTitleInput = screen.getByRole('textbox', { name: 'Job Title:' });
    obj.jobDescriptionLabel = screen.getByText('Job Description:');
    obj.jobDescriptionInput = screen.getByRole('textbox', {
      name: 'Job Description:',
    });
    obj.startingDateLabel = screen.getByText('Starting Date:');
    obj.startingDateInput = screen.getByRole('textbox', {
      name: 'Starting Date:',
    });
    obj.finishingDateLabel = screen.getByText('Finishing Date:');
    obj.finishingDateInput = screen.getByRole('textbox', {
      name: 'Finishing Date:',
    });
  }
  if (jobFormBtns) {
    obj.createBtn = screen.queryByRole('button', { name: 'Create' });
    obj.updateBtn = screen.queryByRole('button', { name: 'Update' });
    obj.deleteBtn = screen.queryByRole('button', { name: 'Delete' });
  }

  // common elements
  if (opacitySlider) {
    obj.opacitySlider = screen.getByRole('slider');
  }
  if (byeByeIcon) {
    obj.byeByeIcon = screen.getByRole('img', { name: /close/i });
  }

  return obj;
};
