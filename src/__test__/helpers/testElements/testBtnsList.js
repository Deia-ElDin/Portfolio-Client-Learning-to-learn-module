import { within } from '@testing-library/react';
import { controlElements } from '../createElements/controls';

export const initiaMainBtnsList = [
  'Login',
  'Home',
  'About Me',
  'Portfolio',
  'Contact Me',
];

export const initialSecondaryBtnsList = [
  'Logout',
  'Profile',
  'Details',
  'Project',
  'Contacts',
];

export const testMainAndSecondariesBtns = (mainBtnsList, secondaryBtnsList) => {
  const { mainControls, secondaryControls } = controlElements({
    mainControls: true,
    secondaryControls: true,
  });

  const mainList = mainBtnsList ? mainBtnsList : initiaMainBtnsList;
  const secondaryList = secondaryBtnsList
    ? secondaryBtnsList
    : initialSecondaryBtnsList;

  for (let i = 0; i < mainList.length; i++) {
    const btn = within(mainControls).getByRole('button', {
      name: mainList[i],
    });
    expect(btn).toBeInTheDocument();
  }

  for (let i = 0; i < secondaryList.length; i++) {
    const btn = within(secondaryControls).getByRole('button', {
      name: secondaryList[i],
    });
    expect(btn).toBeInTheDocument();
  }
};
