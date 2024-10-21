import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils';
import { contactMeElements } from '../helpers/createElements/contactMe';
import { testOpacitySlider } from '../helpers/testElements/testSlider';
import {
  testTextInputs,
  shouldRemoveTheErrsAfterTyping,
} from '../helpers/testElements/testActions';
import user from '@testing-library/user-event';
import MediaForm from '../../features/contactMe/forms/MediaForm';

describe('Media Form', () => {
  beforeEach(() => renderWithProviders(<MediaForm />));

  describe('Render', () => {
    it('should render the media form with all the elements included', () => {
      const mediaForm = contactMeElements({
        mediaForm: true,
        opacitySlider: true,
        byeByeIcon: true,
        mediaFormInputs: true,
        mediaFormBtns: true,
      });

      expect(mediaForm.mediaForm).toBeInTheDocument();
      expect(mediaForm.opacitySlider).toBeInTheDocument();
      expect(mediaForm.byeByeIcon).toBeInTheDocument();
      expect(mediaForm.nameLabel).toBeInTheDocument();
      expect(mediaForm.nameInput).toBeInTheDocument();
      expect(mediaForm.svgLinkLabel).toBeInTheDocument();
      expect(mediaForm.svgLinkInput).toBeInTheDocument();
      expect(mediaForm.linkLabel).toBeInTheDocument();
      expect(mediaForm.linkInput).toBeInTheDocument();
      expect(mediaForm.createBtn).toBeInTheDocument();
      expect(mediaForm.updateBtn).not.toBeInTheDocument();
      expect(mediaForm.deleteBtn).not.toBeInTheDocument();
    });
  });

  describe('User Events', () => {
    it('should be able to change the slider value based on the user choice', () => {
      const { mediaForm, opacitySlider } = contactMeElements({
        mediaForm: true,
        opacitySlider: true,
      });

      testOpacitySlider(mediaForm, opacitySlider, 20);
    });

    it('should be able to type & delete into the form inputs & the input value change accordingly', () => {
      const inputs = contactMeElements({ mediaFormInputs: true });

      const textInputsArray = [
        inputs.nameInput,
        inputs.svgLinkInput,
        inputs.linkInput,
      ];

      testTextInputs(textInputsArray);
    });
  });

  describe('Errors', () => {
    it('should render the errMsg + 3 errIcons, if the user did not provide any data', async () => {
      const errMsg =
        'Must provide a social media, the social media svg link, the social media link';

      const mediaForm = contactMeElements({
        mediaForm: true,
        opacitySlider: true,
        mediaFormInputs: true,
        mediaFormBtns: true,
      });

      user.click(mediaForm.createBtn);

      const errElement = await waitFor(() => screen.findByText(errMsg));
      const errIcons = await waitFor(() => screen.findAllByTestId('err-icon'));

      expect(errElement).toBeInTheDocument();
      expect(errIcons.length).toBe(3);

      shouldRemoveTheErrsAfterTyping({
        errMsg,
        opacitySlider: mediaForm.opacitySlider,
        form: mediaForm.mediaForm,
        input: mediaForm.nameInput,
      });
    });

    it('should render the errMsg: Must provide the social media svg link, the social media link + 2 errIcon', async () => {
      const errMsg =
        'Must provide the social media svg link, the social media link';

      const mediaForm = contactMeElements({
        mediaForm: true,
        opacitySlider: true,
        mediaFormInputs: true,
        mediaFormBtns: true,
      });

      // user did not provide the social media svg link and social media link
      user.type(mediaForm.nameInput, 'some text');

      user.click(mediaForm.createBtn);

      const errElement = await waitFor(() => screen.findByText(errMsg));
      const errIcons = await waitFor(() => screen.findAllByTestId('err-icon'));

      expect(errElement).toBeInTheDocument();
      expect(errIcons.length).toBe(2);

      shouldRemoveTheErrsAfterTyping({
        errMsg,
        opacitySlider: mediaForm.opacitySlider,
        form: mediaForm.mediaForm,
        input: mediaForm.nameInput,
      });
    });

    it('should render the errMsg: Must provide the social media link + 1 errIcon', async () => {
      const errMsg = 'Must provide the social media link';

      const mediaForm = contactMeElements({
        mediaForm: true,
        opacitySlider: true,
        mediaFormInputs: true,
        mediaFormBtns: true,
      });

      // user did not provide the social media link
      user.type(mediaForm.nameInput, 'some text');
      user.type(mediaForm.svgLinkInput, 'some text');

      user.click(mediaForm.createBtn);

      const errElement = await waitFor(() => screen.findByText(errMsg));
      const errIcons = await waitFor(() => screen.findAllByTestId('err-icon'));

      expect(errElement).toBeInTheDocument();
      expect(errIcons.length).toBe(1);

      shouldRemoveTheErrsAfterTyping({
        errMsg,
        opacitySlider: mediaForm.opacitySlider,
        form: mediaForm.mediaForm,
        input: mediaForm.nameInput,
      });
    });
  });
});
