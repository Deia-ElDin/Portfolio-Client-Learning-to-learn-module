import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils';
import { contactMeElements } from '../helpers/createElements/contactMe';
import { testOpacitySlider } from '../helpers/testElements/testSlider';
import {
  testTextInputs,
  shouldRemoveTheErrsAfterTyping,
} from '../helpers/testElements/testActions';
import user from '@testing-library/user-event';
import ContactForm from '../../features/contactMe/forms/ContactForm';

describe('Contact Form', () => {
  beforeEach(() => renderWithProviders(<ContactForm />));

  describe('Render', () => {
    it('should render the contact form with all the elements included', () => {
      const contactForm = contactMeElements({
        contactForm: true,
        opacitySlider: true,
        byeByeIcon: true,
        contactFormInputs: true,
        contactFormBtns: true,
      });

      expect(contactForm.contactForm).toBeInTheDocument();
      expect(contactForm.opacitySlider).toBeInTheDocument();
      expect(contactForm.byeByeIcon).toBeInTheDocument();
      expect(contactForm.nameLabel).toBeInTheDocument();
      expect(contactForm.nameInput).toBeInTheDocument();
      expect(contactForm.svgLinkLabel).toBeInTheDocument();
      expect(contactForm.svgLinkInput).toBeInTheDocument();
      expect(contactForm.infoLabel).toBeInTheDocument();
      expect(contactForm.infoInput).toBeInTheDocument();
      expect(contactForm.createBtn).toBeInTheDocument();
      expect(contactForm.updateBtn).not.toBeInTheDocument();
      expect(contactForm.deleteBtn).not.toBeInTheDocument();
    });
  });

  describe('User Events', () => {
    it('should be able to change the slider value based on the user choice', () => {
      const { contactForm, opacitySlider } = contactMeElements({
        contactForm: true,
        opacitySlider: true,
      });

      testOpacitySlider(contactForm, opacitySlider, 30);
    });

    it('should be able to type & delete into the form inputs & the input value change accordingly', () => {
      const inputs = contactMeElements({ contactFormInputs: true });

      const textInputsArray = [
        inputs.nameInput,
        inputs.svgLinkInput,
        inputs.infoInput,
      ];

      testTextInputs(textInputsArray);
    });
  });

  describe('Errors', () => {
    it('should render the errMsg + 3 errIcons, if the user did not provide any data', async () => {
      const errMsg =
        'Must provide a contact, the contact svg link, the contact information';

      const contactForm = contactMeElements({
        contactForm: true,
        opacitySlider: true,
        contactFormInputs: true,
        contactFormBtns: true,
      });

      user.click(contactForm.createBtn);

      const errElement = await waitFor(() => screen.findByText(errMsg));
      const errIcons = await waitFor(() => screen.findAllByTestId('err-icon'));

      expect(errElement).toBeInTheDocument();
      expect(errIcons.length).toBe(3);

      shouldRemoveTheErrsAfterTyping({
        errMsg,
        opacitySlider: contactForm.opacitySlider,
        form: contactForm.contactForm,
        input: contactForm.nameInput,
      });
    });

    it('should render the errMsg: Must provide the contact svg link, the contact information + 2 errIcon', async () => {
      const errMsg =
        'Must provide the contact svg link, the contact information';

      const contactForm = contactMeElements({
        contactForm: true,
        opacitySlider: true,
        contactFormInputs: true,
        contactFormBtns: true,
      });

      // user did not provide the contact svg link and contact info
      user.type(contactForm.nameInput, 'some text');

      user.click(contactForm.createBtn);

      const errElement = await waitFor(() => screen.findByText(errMsg));
      const errIcons = await waitFor(() => screen.findAllByTestId('err-icon'));

      expect(errElement).toBeInTheDocument();
      expect(errIcons.length).toBe(2);

      shouldRemoveTheErrsAfterTyping({
        errMsg,
        opacitySlider: contactForm.opacitySlider,
        form: contactForm.contactForm,
        input: contactForm.nameInput,
      });
    });

    it('should render the errMsg: Must provide the contact information + 1 errIcon', async () => {
      const errMsg = 'Must provide the contact information';

      const contactForm = contactMeElements({
        contactForm: true,
        opacitySlider: true,
        contactFormInputs: true,
        contactFormBtns: true,
      });

      // user did not provide the contact info
      user.type(contactForm.nameInput, 'some text');
      user.type(contactForm.svgLinkInput, 'some text');

      user.click(contactForm.createBtn);

      const errElement = await waitFor(() => screen.findByText(errMsg));
      const errIcons = await waitFor(() => screen.findAllByTestId('err-icon'));

      expect(errElement).toBeInTheDocument();
      expect(errIcons.length).toBe(1);

      shouldRemoveTheErrsAfterTyping({
        errMsg,
        opacitySlider: contactForm.opacitySlider,
        form: contactForm.contactForm,
        input: contactForm.nameInput,
      });
    });
  });
});
