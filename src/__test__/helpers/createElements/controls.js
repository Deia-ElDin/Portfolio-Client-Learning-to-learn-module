import { screen, within } from '@testing-library/react';

export const controlElements = ({
  controls,
  mainControls,
  secondaryControls,

  getAllBtns,

  loginBtn,
  logoutBtn,

  homeBtn,
  profileBtn,

  aboutMeBtn,
  detailsBtn,
  detailsSubs,

  portfolioBtn,
  projectBtn,
  projectSubs,

  contactMeBtn,
  contactsBtn,
  contactsSubs,
}) => {
  const obj = {};

  if (controls) {
    obj.controls = screen.getByRole('region', { name: 'Control buttons' });
  }
  if (mainControls) {
    obj.mainControls = screen.getByRole('region', { name: 'Main controls' });
  }
  if (secondaryControls) {
    obj.secondaryControls = screen.getByRole('region', {
      name: 'Secondary controls',
    });
  }

  if (loginBtn || getAllBtns) {
    obj.loginBtn = screen.getByRole('button', { name: 'Login' });
  }
  if (logoutBtn || getAllBtns) {
    obj.logoutBtn = screen.getByRole('button', { name: 'Logout' });
  }

  if (homeBtn || getAllBtns) {
    obj.homeBtn = screen.getByRole('button', { name: 'Home' });
  }
  if (profileBtn || getAllBtns) {
    obj.profileBtn = screen.getByRole('button', { name: 'Profile' });
  }

  if (aboutMeBtn || getAllBtns) {
    obj.aboutMeBtn = screen.getByRole('button', { name: 'About Me' });
  }
  if (detailsBtn || getAllBtns) {
    obj.detailsBtn = screen.getByRole('button', { name: 'Details' });
  }
  if (detailsSubs || getAllBtns) {
    obj.skillFormBtn = screen.queryByText('S');
    obj.jobFormBtn = screen.queryByText('J');
  }

  if (portfolioBtn || getAllBtns) {
    obj.portfolioBtn = screen.getByRole('button', { name: 'Portfolio' });
  }
  if (projectBtn || getAllBtns) {
    obj.projectBtn = screen.getByRole('button', { name: 'Project' });
  }
  if (projectSubs || getAllBtns) {
    obj.projectFormBtn = screen.queryByText('P');
    obj.fetchFormBtn = screen.queryByText('F');
  }

  if (contactMeBtn || getAllBtns) {
    obj.contactMeBtn = screen.getByRole('button', { name: 'Contact Me' });
  }
  if (contactsBtn || getAllBtns) {
    obj.contactsBtn = screen.getByRole('button', { name: 'Contacts' });
  }
  if (contactsSubs || getAllBtns) {
    obj.contactFormBtn = screen.queryByText('C');
    obj.mediaFormBtn = screen.queryByText('M');
  }

  return obj;
};
