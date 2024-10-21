import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils';
import { aboutMeElements } from '../helpers/createElements/aboutMe';
import { testOpacitySlider } from '../helpers/testElements/testSlider';
import {
  testTextInputs,
  shouldRemoveTheErrsAfterTyping,
} from '../helpers/testElements/testActions';
import user from '@testing-library/user-event';
import JobForm from '../../features/aboutMe/jobs/JobForm';

describe('Job Form', () => {
  beforeEach(() => renderWithProviders(<JobForm />));

  describe('Render', () => {
    it('should render the job form with all the elements included', () => {
      const jobform = aboutMeElements({
        jobForm: true,
        opacitySlider: true,
        byeByeIcon: true,
        jobFormInputs: true,
        jobFormBtns: true,
      });

      expect(jobform.jobForm).toBeInTheDocument();
      expect(jobform.opacitySlider).toBeInTheDocument();
      expect(jobform.byeByeIcon).toBeInTheDocument();
      expect(jobform.countryNameLabel).toBeInTheDocument();
      expect(jobform.countryNameInput).toBeInTheDocument();
      expect(jobform.countrySvgLinkLabel).toBeInTheDocument();
      expect(jobform.countrySvgLinkInput).toBeInTheDocument();
      expect(jobform.companyNameLabel).toBeInTheDocument();
      expect(jobform.companyNameInput).toBeInTheDocument();
      expect(jobform.jobTitleLabel).toBeInTheDocument();
      expect(jobform.jobTitleInput).toBeInTheDocument();
      expect(jobform.jobDescriptionLabel).toBeInTheDocument();
      expect(jobform.jobDescriptionInput).toBeInTheDocument();
      expect(jobform.startingDateLabel).toBeInTheDocument();
      expect(jobform.startingDateInput).toBeInTheDocument();
      expect(jobform.finishingDateLabel).toBeInTheDocument();
      expect(jobform.finishingDateInput).toBeInTheDocument();
      expect(jobform.createBtn).toBeInTheDocument();
      expect(jobform.updateBtn).not.toBeInTheDocument();
      expect(jobform.deleteBtn).not.toBeInTheDocument();
    });
  });

  describe('User Events', () => {
    it('should be able to change the slider value based on the user choice', () => {
      const { jobForm, opacitySlider } = aboutMeElements({
        jobForm: true,
        opacitySlider: true,
      });

      testOpacitySlider(jobForm, opacitySlider, 60);
    });

    it('should be able to type & delete into the form inputs & the input value change accordingly', () => {
      const inputs = aboutMeElements({ jobFormInputs: true });

      const textInputsArray = [
        inputs.countryNameInput,
        inputs.countrySvgLinkInput,
        inputs.companyNameInput,
        inputs.jobTitleInput,
        inputs.jobDescriptionInput,
        inputs.startingDateInput,
        inputs.finishingDateInput,
      ];

      testTextInputs(textInputsArray);
    });
  });

  describe('Errors', () => {
    it('should render the errMsg + 7 errIcons, if the user did not provide any data', async () => {
      const errMsg =
        'Must provide the country name, the country flag, the company name, the job title, the job description, the starting date, the finishing date';
      const jobForm = aboutMeElements({
        jobForm: true,
        opacitySlider: true,
        jobFormInputs: true,
        jobFormBtns: true,
      });

      user.click(jobForm.createBtn);

      const errElement = await waitFor(() => screen.findByText(errMsg));
      const errIcons = await waitFor(() => screen.findAllByTestId('err-icon'));

      expect(errElement).toBeInTheDocument();
      expect(errIcons.length).toBe(7);

      shouldRemoveTheErrsAfterTyping({
        errMsg,
        opacitySlider: jobForm.opacitySlider,
        form: jobForm.jobForm,
        input: jobForm.countryNameInput,
      });
    });

    it('should render the errMsg: Must provide the country name + 1 errIcon', async () => {
      const errMsg = 'Must provide the country name';
      const jobForm = aboutMeElements({
        jobForm: true,
        opacitySlider: true,
        jobFormInputs: true,
        jobFormBtns: true,
      });

      // user did not provide the country name
      user.type(jobForm.countrySvgLinkInput, 'www.UAE.com');
      user.type(jobForm.companyNameInput, 'Company');
      user.type(jobForm.jobTitleInput, 'Front-End Web Developer');
      user.type(
        jobForm.jobDescriptionInput,
        'Front-End Web Developer & server'
      );
      user.type(jobForm.startingDateInput, '2022');
      user.type(jobForm.finishingDateInput, 'now');

      user.click(jobForm.createBtn);

      const errElement = await waitFor(() => screen.findByText(errMsg));
      const errIcons = await waitFor(() => screen.findAllByTestId('err-icon'));

      expect(errElement).toBeInTheDocument();
      expect(errIcons.length).toBe(1);

      shouldRemoveTheErrsAfterTyping({
        errMsg,
        opacitySlider: jobForm.opacitySlider,
        form: jobForm.jobForm,
        input: jobForm.countryNameInput,
      });
    });

    it('should render the errMsg: Must provide the country flag + 1 errIcon', async () => {
      const errMsg = 'Must provide the country flag';
      const jobForm = aboutMeElements({
        jobForm: true,
        opacitySlider: true,
        jobFormInputs: true,
        jobFormBtns: true,
      });

      // user didn't provide the country flag svgLink
      user.type(jobForm.countryNameInput, 'UAE');
      user.type(jobForm.companyNameInput, 'Company');
      user.type(jobForm.jobTitleInput, 'Front-End Web Developer');
      user.type(
        jobForm.jobDescriptionInput,
        'Front-End Web Developer & server'
      );
      user.type(jobForm.startingDateInput, '2022');
      user.type(jobForm.finishingDateInput, 'now');

      user.click(jobForm.createBtn);

      const errElement = await waitFor(() => screen.findByText(errMsg));
      const errIcons = await waitFor(() => screen.findAllByTestId('err-icon'));

      expect(errElement).toBeInTheDocument();
      expect(errIcons.length).toBe(1);

      shouldRemoveTheErrsAfterTyping({
        errMsg,
        opacitySlider: jobForm.opacitySlider,
        form: jobForm.jobForm,
        input: jobForm.countryNameInput,
      });
    });

    it('should render the errMsg: Must provide the company name + 1 errIcon', async () => {
      const errMsg = 'Must provide the company name';
      const jobForm = aboutMeElements({
        jobForm: true,
        opacitySlider: true,
        jobFormInputs: true,
        jobFormBtns: true,
      });

      // user didn't provide the company name
      user.type(jobForm.countryNameInput, 'UAE');
      user.type(jobForm.countrySvgLinkInput, 'www.UAE.com');
      user.type(jobForm.jobTitleInput, 'Front-End Web Developer');
      user.type(
        jobForm.jobDescriptionInput,
        'Front-End Web Developer & server'
      );
      user.type(jobForm.startingDateInput, '2022');
      user.type(jobForm.finishingDateInput, 'now');

      user.click(jobForm.createBtn);

      const errElement = await waitFor(() => screen.findByText(errMsg));
      const errIcons = await waitFor(() => screen.findAllByTestId('err-icon'));

      expect(errElement).toBeInTheDocument();
      expect(errIcons.length).toBe(1);

      shouldRemoveTheErrsAfterTyping({
        errMsg,
        opacitySlider: jobForm.opacitySlider,
        form: jobForm.jobForm,
        input: jobForm.countryNameInput,
      });
    });

    it('should render the errMsg: Must provide the job title + 1 errIcon', async () => {
      const errMsg = 'Must provide the job title';
      const jobForm = aboutMeElements({
        jobForm: true,
        opacitySlider: true,
        jobFormInputs: true,
        jobFormBtns: true,
      });

      // user didn't provide the job title
      user.type(jobForm.countryNameInput, 'UAE');
      user.type(jobForm.countrySvgLinkInput, 'www.UAE.com');
      user.type(jobForm.companyNameInput, 'Company');
      user.type(
        jobForm.jobDescriptionInput,
        'Front-End Web Developer & server'
      );
      user.type(jobForm.startingDateInput, '2022');
      user.type(jobForm.finishingDateInput, 'now');

      user.click(jobForm.createBtn);

      const errElement = await waitFor(() => screen.findByText(errMsg));
      const errIcons = await waitFor(() => screen.findAllByTestId('err-icon'));

      expect(errElement).toBeInTheDocument();
      expect(errIcons.length).toBe(1);

      shouldRemoveTheErrsAfterTyping({
        errMsg,
        opacitySlider: jobForm.opacitySlider,
        form: jobForm.jobForm,
        input: jobForm.countryNameInput,
      });
    });

    it('should render the errMsg: Must provide the job description + 1 errIcon', async () => {
      const errMsg = 'Must provide the job description';
      const jobForm = aboutMeElements({
        jobForm: true,
        opacitySlider: true,
        jobFormInputs: true,
        jobFormBtns: true,
      });

      // user didn't provide the job description
      user.type(jobForm.countryNameInput, 'UAE');
      user.type(jobForm.countrySvgLinkInput, 'www.UAE.com');
      user.type(jobForm.companyNameInput, 'Company');
      user.type(jobForm.jobTitleInput, 'Front-End Web Developer');
      user.type(jobForm.startingDateInput, '2022');
      user.type(jobForm.finishingDateInput, 'now');

      user.click(jobForm.createBtn);

      const errElement = await waitFor(() => screen.findByText(errMsg));
      const errIcons = await waitFor(() => screen.findAllByTestId('err-icon'));

      expect(errElement).toBeInTheDocument();
      expect(errIcons.length).toBe(1);
      shouldRemoveTheErrsAfterTyping({
        errMsg,
        opacitySlider: jobForm.opacitySlider,
        form: jobForm.jobForm,
        input: jobForm.countryNameInput,
      });
    });

    it('should render the errMsg: Must provide the starting date + 1 errIcon', async () => {
      const errMsg = 'Must provide the starting date';
      const jobForm = aboutMeElements({
        jobForm: true,
        opacitySlider: true,
        jobFormInputs: true,
        jobFormBtns: true,
      });

      // user didn't provide the the starting date
      user.type(jobForm.countryNameInput, 'UAE');
      user.type(jobForm.countrySvgLinkInput, 'www.UAE.com');
      user.type(jobForm.companyNameInput, 'Company');
      user.type(jobForm.jobTitleInput, 'Front-End Web Developer');
      user.type(
        jobForm.jobDescriptionInput,
        'Front-End Web Developer & server'
      );
      user.type(jobForm.finishingDateInput, 'now');

      user.click(jobForm.createBtn);

      const errElement = await waitFor(() => screen.findByText(errMsg));
      const errIcons = await waitFor(() => screen.findAllByTestId('err-icon'));

      expect(errElement).toBeInTheDocument();
      expect(errIcons.length).toBe(1);

      shouldRemoveTheErrsAfterTyping({
        errMsg,
        opacitySlider: jobForm.opacitySlider,
        form: jobForm.jobForm,
        input: jobForm.countryNameInput,
      });
    });

    it('should render the errMsg: Must provide the finishing date + 1 errIcon', async () => {
      const errMsg = 'Must provide the finishing date';
      const jobForm = aboutMeElements({
        jobForm: true,
        opacitySlider: true,
        jobFormInputs: true,
        jobFormBtns: true,
      });

      // user didn't provide the finishing date
      user.type(jobForm.countryNameInput, 'UAE');
      user.type(jobForm.countrySvgLinkInput, 'www.UAE.com');
      user.type(jobForm.companyNameInput, 'Company');
      user.type(jobForm.jobTitleInput, 'Front-End Web Developer');
      user.type(
        jobForm.jobDescriptionInput,
        'Front-End Web Developer & server'
      );
      user.type(jobForm.startingDateInput, '2022');

      user.click(jobForm.createBtn);

      const errElement = await waitFor(() => screen.findByText(errMsg));
      const errIcons = await waitFor(() => screen.findAllByTestId('err-icon'));

      expect(errElement).toBeInTheDocument();
      expect(errIcons.length).toBe(1);

      shouldRemoveTheErrsAfterTyping({
        errMsg,
        opacitySlider: jobForm.opacitySlider,
        form: jobForm.jobForm,
        input: jobForm.countryNameInput,
      });
    });
  });
});
