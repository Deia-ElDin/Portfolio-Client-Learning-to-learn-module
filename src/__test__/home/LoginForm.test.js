import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils';
import { homeElements } from '../helpers/createElements/home';
import { testOpacitySlider } from '../helpers/testElements/testSlider';
import {
  testTextInputs,
  shouldRemoveTheErrsAfterTyping,
} from '../helpers/testElements/testActions';
import user from '@testing-library/user-event';
import LoginFrom from '../../features/auth/Login';

describe('Login Form', () => {
  beforeEach(() => renderWithProviders(<LoginFrom />));

  describe('Render', () => {
    it('should render the login form with all the elements included', () => {
      const loginForm = homeElements({
        loginForm: true,
        opacitySlider: true,
        byeByeIcon: true,
        loginInputs: true,
        pwIcons: true,
      });

      expect(loginForm.loginForm).toBeInTheDocument();
      expect(loginForm.opacitySlider).toBeInTheDocument();
      expect(loginForm.byeByeIcon).toBeInTheDocument();
      expect(loginForm.usernameLabel).toBeInTheDocument();
      expect(loginForm.usernameInput).toBeInTheDocument();
      expect(loginForm.passwordLabel).toBeInTheDocument();
      expect(loginForm.passwordInput).toBeInTheDocument();
      expect(loginForm.showPwIcon).toBeInTheDocument();
      expect(loginForm.loginBtn).toBeInTheDocument();
    });
  });

  describe('User Events', () => {
    it('should be able to change the slider value based on the user choice', () => {
      const { loginForm, opacitySlider } = homeElements({
        loginForm: true,
        opacitySlider: true,
      });

      testOpacitySlider(loginForm, opacitySlider, 90);
    });

    it('should be able to type & delete into the form inputs & the input value change accordingly', () => {
      const { usernameInput, passwordInput } = homeElements({
        loginInputs: true,
      });

      testTextInputs([usernameInput, passwordInput]);
    });

    it('should be able to toggle between the showPassowrd & hidePassword icons', () => {
      const elements1 = homeElements({ loginInputs: true, pwIcons: true });
      expect(elements1.passwordInput).toHaveAttribute('type', 'password');
      expect(elements1.showPwIcon).toBeInTheDocument();
      expect(elements1.hidePwIcon).not.toBeInTheDocument();

      user.click(elements1.showPwIcon);

      const elements2 = homeElements({ loginInputs: true, pwIcons: true });
      expect(elements2.passwordInput).toHaveAttribute('type', 'text');
      expect(elements2.showPwIcon).not.toBeInTheDocument();
      expect(elements2.hidePwIcon).toBeInTheDocument();

      user.click(elements2.hidePwIcon);

      const elements3 = homeElements({ loginInputs: true, pwIcons: true });
      expect(elements3.passwordInput).toHaveAttribute('type', 'password');
      expect(elements3.showPwIcon).toBeInTheDocument();
      expect(elements3.hidePwIcon).not.toBeInTheDocument();
    });
  });

  describe('Errors', () => {
    it('should render the errMsg + 2 errIcons, if the user did not provide any data', async () => {
      const errMsg = 'Must provide username and password';
      const loginForm = homeElements({
        loginForm: true,
        opacitySlider: true,
        loginInputs: true,
      });

      user.click(screen.getByRole('button', { name: 'Log In' }));

      const errElement = await waitFor(() => screen.findByText(errMsg));
      const errIcons = await waitFor(() => screen.findAllByTestId('err-icon'));

      expect(errElement).toBeInTheDocument();
      expect(errIcons.length).toBe(2);

      shouldRemoveTheErrsAfterTyping({
        errMsg,
        opacitySlider: loginForm.opacitySlider,
        form: loginForm.loginForm,
        input: loginForm.usernameInput,
      });
    });

    it('should render the errMsg: Must provide password + 1 errIcon', async () => {
      const errMsg = 'Must provide password';
      const loginForm = homeElements({
        loginForm: true,
        opacitySlider: true,
        loginInputs: true,
      });

      // user didn't provide password
      user.type(loginForm.usernameInput, 'deia');
      user.click(loginForm.loginBtn);

      const errElement = await waitFor(() => screen.findByText(errMsg));
      const errIcons = await waitFor(() => screen.findAllByTestId('err-icon'));

      expect(errElement).toBeInTheDocument();
      expect(errIcons.length).toBe(1);

      shouldRemoveTheErrsAfterTyping({
        errMsg,
        opacitySlider: loginForm.opacitySlider,
        form: loginForm.loginForm,
        input: loginForm.usernameInput,
      });
    });

    it('should render the errMsg: Must provide username + 1 errIcon', async () => {
      const errMsg = 'Must provide username';
      const loginForm = homeElements({
        loginForm: true,
        opacitySlider: true,
        loginInputs: true,
      });

      // user didn't provide username
      user.type(loginForm.passwordInput, '123');
      user.click(loginForm.loginBtn);

      const errElement = await waitFor(() => screen.findByText(errMsg));
      const errIcons = await waitFor(() => screen.findAllByTestId('err-icon'));

      expect(errElement).toBeInTheDocument();
      expect(errIcons.length).toBe(1);

      shouldRemoveTheErrsAfterTyping({
        errMsg,
        opacitySlider: loginForm.opacitySlider,
        form: loginForm.loginForm,
        input: loginForm.usernameInput,
      });
    });

    it('should render the errMsg: Invalid Credential + 0 errIcon', async () => {
      const errMsg = 'Invalid Credentials';
      const loginForm = homeElements({
        loginForm: true,
        opacitySlider: true,
        loginInputs: true,
      });

      // user did provide username & password but we don't have that account
      user.type(loginForm.usernameInput, 'deia');
      user.type(loginForm.passwordInput, '123');
      user.click(loginForm.loginBtn);

      const errElement = await waitFor(() => screen.findByText(errMsg));
      const errIcons = await waitFor(() => screen.queryAllByTestId('err-icon'));

      expect(errElement).toBeInTheDocument();
      expect(errIcons.length).toBe(0);

      shouldRemoveTheErrsAfterTyping({
        errMsg,
        opacitySlider: loginForm.opacitySlider,
        form: loginForm.loginForm,
        input: loginForm.usernameInput,
      });
    });
  });
});
