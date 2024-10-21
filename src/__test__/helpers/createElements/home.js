import { screen } from '@testing-library/react';

export const homeElements = ({
  homePage,
  myName,
  jobTitle,
  myInfos,
  footer,
  homeForms,
  // login form
  loginForm,
  loginInputs,
  pwIcons,
  // profile form
  profileForm,
  profileInput,
  // common elements
  opacitySlider,
  byeByeIcon,
}) => {
  const obj = {};

  if (homePage) {
    obj.homePage = screen.queryByRole('region', { name: 'Home' });
  }
  if (myName) {
    obj.myName = screen.getByRole('heading', { name: /i'm deia/i });
  }
  if (jobTitle) {
    obj.jobTitle = screen.getByRole('heading', {
      name: /a front-end web developer/i,
    });
  }
  if (myInfos) {
    obj.myInfos = screen.getByText(
      /Hi, I'm a web developer based in Abu Dhabi, UAE. I have a passion for web design and love to create for web and mobile devices./i
    );
  }
  if (footer) {
    const year = new Date().getFullYear();
    obj.footer = screen.getByText(`© ${year} Deia-Eldin`);
  }

  // login form
  if (loginForm || homeForms) {
    obj.loginForm = screen.queryByRole('form', { name: 'Login form' });
  }
  if (loginInputs) {
    obj.usernameLabel = screen.getByText('Username:');
    obj.usernameInput = screen.getByRole('textbox', { name: 'Username:' });
    obj.passwordLabel = screen.getByText('Password:');
    obj.passwordInput = screen.getByTestId('password-input');
    obj.loginBtn = screen.getByRole('button', { name: 'Log In' });
  }
  if (pwIcons) {
    obj.showPwIcon = screen.queryByTestId('show-password');
    obj.hidePwIcon = screen.queryByTestId('hide-password');
  }

  // profile form
  if (profileForm || homeForms) {
    obj.profileForm = screen.queryByRole('form', { name: 'Profile form' });
  }
  if (profileInput) {
    obj.dropBoxInput = screen.getByTestId('drop-box');
    obj.uploadImg = screen.getByRole('img', { name: /upload/i });
    obj.spanText = screen.getByText(/drag & drop your profile picture here/i);
    obj.createBtn = screen.getByRole('button', { name: 'Create' });
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
