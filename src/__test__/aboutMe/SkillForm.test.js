import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils';
import { aboutMeElements } from '../helpers/createElements/aboutMe';
import { testOpacitySlider } from '../helpers/testElements/testSlider';
import {
  testTextInputs,
  shouldRemoveTheErrsAfterTyping,
} from '../helpers/testElements/testActions';
import user from '@testing-library/user-event';
import SkillFrom from '../../features/aboutMe/skills/SkillForm';

describe('Skill Form', () => {
  beforeEach(() => renderWithProviders(<SkillFrom />));

  describe('Render', () => {
    it('should render the skill form after clicking on the detailsBtn, then click again on the skillFormBtn', () => {
      const skillForm = aboutMeElements({
        skillForm: true,
        opacitySlider: true,
        byeByeIcon: true,
        skillFormInputs: true,
        skillFormBtns: true,
      });

      expect(skillForm.skillForm).toBeInTheDocument();
      expect(skillForm.opacitySlider).toBeInTheDocument();
      expect(skillForm.byeByeIcon).toBeInTheDocument();
      expect(skillForm.skillNameLabel).toBeInTheDocument();
      expect(skillForm.skillNameInput).toBeInTheDocument();
      expect(skillForm.svgLinkLabel).toBeInTheDocument();
      expect(skillForm.svgLinkInput).toBeInTheDocument();
      expect(skillForm.percentageLabel).toBeInTheDocument();
      expect(skillForm.percentageInput).toBeInTheDocument();
      expect(skillForm.createBtn).toBeInTheDocument();
      expect(skillForm.updateBtn).not.toBeInTheDocument();
      expect(skillForm.deleteBtn).not.toBeInTheDocument();
    });
  });

  describe('User Events', () => {
    it('should be able to change the slider value based on the user choice', () => {
      const { skillForm, opacitySlider } = aboutMeElements({
        skillForm: true,
        opacitySlider: true,
      });

      testOpacitySlider(skillForm, opacitySlider, 70);
    });

    it('should be able to type & delete into the form inputs & the input value change accordingly', () => {
      const inputs = aboutMeElements({ skillFormInputs: true });

      const textInputsArray = [inputs.skillNameInput, inputs.svgLinkInput];

      testTextInputs(textInputsArray);

      expect(inputs.percentageInput.value).toBe('');
      user.type(inputs.percentageInput, '95');
      expect(inputs.percentageInput.value).toBe('95');
      user.type(inputs.percentageInput, '{selectall}{backspace}');
      expect(inputs.percentageInput.value).toBe('');
    });

    it('should not render any percentageInput values above 100 or a negative value, instead render the max value which is 100 or clear the input if the provided value were negative', () => {
      const { percentageInput } = aboutMeElements({ skillFormInputs: true });

      user.type(percentageInput, '105');
      expect(percentageInput.value).toBe('100');

      user.type(percentageInput, '-2');
      expect(percentageInput.value).toBe('');
    });
  });

  describe('Errors', () => {
    it('should render the errMsg + 3 errIcons, if the user did not provide any data', async () => {
      const errMsg =
        'Must provide the technology name, the technology svg link, the technology percentage';
      const skillForm = aboutMeElements({
        skillForm: true,
        opacitySlider: true,
        skillFormInputs: true,
        skillFormBtns: true,
      });

      user.click(skillForm.createBtn);

      const errElement = await waitFor(() => screen.findByText(errMsg));
      const errIcons = await waitFor(() => screen.findAllByTestId('err-icon'));

      expect(errElement).toBeInTheDocument();
      expect(errIcons.length).toBe(3);

      shouldRemoveTheErrsAfterTyping({
        errMsg,
        opacitySlider: skillForm.opacitySlider,
        form: skillForm.skillForm,
        input: skillForm.skillNameInput,
      });
    });

    it('should render the errMsg: Must provide  the technology name + 1 errIcon', async () => {
      const errMsg = 'Must provide the technology name';
      const skillForm = aboutMeElements({
        skillForm: true,
        opacitySlider: true,
        skillFormInputs: true,
        skillFormBtns: true,
      });

      // user didn't provide the technology name
      user.type(skillForm.svgLinkInput, 'www.rtl.com');
      user.type(skillForm.percentageInput, '95');
      user.click(skillForm.createBtn);

      const errElement = await waitFor(() => screen.findByText(errMsg));
      const errIcons = await waitFor(() => screen.findAllByTestId('err-icon'));

      expect(errElement).toBeInTheDocument();
      expect(errIcons.length).toBe(1);

      shouldRemoveTheErrsAfterTyping({
        errMsg,
        opacitySlider: skillForm.opacitySlider,
        form: skillForm.skillForm,
        input: skillForm.skillNameInput,
      });
    });

    it('should render the errMsg: Must provide  the technology svg link + 1 errIcon', async () => {
      const errMsg = 'Must provide the technology svg link';
      const skillForm = aboutMeElements({
        skillForm: true,
        opacitySlider: true,
        skillFormInputs: true,
        skillFormBtns: true,
      });

      // user didn't provide the technology svgLink
      user.type(skillForm.skillNameInput, 'react testing library');
      user.type(skillForm.percentageInput, '95');
      user.click(skillForm.createBtn);

      const errElement = await waitFor(() => screen.findByText(errMsg));
      const errIcons = await waitFor(() => screen.findAllByTestId('err-icon'));

      expect(errElement).toBeInTheDocument();
      expect(errIcons.length).toBe(1);

      shouldRemoveTheErrsAfterTyping({
        errMsg,
        opacitySlider: skillForm.opacitySlider,
        form: skillForm.skillForm,
        input: skillForm.skillNameInput,
      });
    });

    it('should render the errMsg: Must provide  the technology percentage + 1 errIcon', async () => {
      const errMsg = 'Must provide the technology percentage';
      const skillForm = aboutMeElements({
        skillForm: true,
        opacitySlider: true,
        skillFormInputs: true,
        skillFormBtns: true,
      });

      // user didn't provide the technology percentage
      user.type(skillForm.skillNameInput, 'react testing library');
      user.type(skillForm.svgLinkInput, 'www.rtl.com');
      user.click(skillForm.createBtn);

      const errElement = await waitFor(() => screen.findByText(errMsg));
      const errIcons = await waitFor(() => screen.findAllByTestId('err-icon'));

      expect(errElement).toBeInTheDocument();
      expect(errIcons.length).toBe(1);

      shouldRemoveTheErrsAfterTyping({
        errMsg,
        opacitySlider: skillForm.opacitySlider,
        form: skillForm.skillForm,
        input: skillForm.skillNameInput,
      });
    });
  });
});
