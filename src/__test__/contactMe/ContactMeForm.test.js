import { renderWithProviders } from '../../test-utils';
import { contactMeElements } from '../helpers/createElements/contactMe';
import { testTextInputs } from '../helpers/testElements/testActions';
import user from '@testing-library/user-event';
import RightContactMe from '../../features/contactMe/RightContactMe';

describe('Contact Me Form', () => {
  beforeEach(() => renderWithProviders(<RightContactMe />));

  describe('Render', () => {
    it('should render the contact me form with all the elements included', () => {
      const contactMeForm = contactMeElements({
        contactMeForm: true,
        contactMeFormInputs: true,
      });

      expect(contactMeForm.contactMeForm).toBeInTheDocument();
      expect(contactMeForm.nameLabel).toBeInTheDocument();
      expect(contactMeForm.nameLabel).toHaveClass('off-screen');
      expect(contactMeForm.nameInput).toBeInTheDocument();
      expect(contactMeForm.emailLabel).toBeInTheDocument();
      expect(contactMeForm.emailLabel).toHaveClass('off-screen');
      expect(contactMeForm.emailInput).toBeInTheDocument();
      expect(contactMeForm.subjectLabel).toBeInTheDocument();
      expect(contactMeForm.subjectLabel).toHaveClass('off-screen');
      expect(contactMeForm.subjectInput).toBeInTheDocument();
      expect(contactMeForm.messageLabel).toBeInTheDocument();
      expect(contactMeForm.messageLabel).toHaveClass('off-screen');
      expect(contactMeForm.messageTextArea).toBeInTheDocument();
      expect(contactMeForm.sayHelloBtn).toBeInTheDocument();
    });
  });

  describe('User Events', () => {
    it('should be able to type & delete into the form inputs & the input value change accordingly', () => {
      const inputs = contactMeElements({ contactMeFormInputs: true });

      const textInputsArray = [
        inputs.nameInput,
        inputs.subjectInput,
        inputs.messageTextArea,
      ];

      expect(inputs.emailInput.value).toBe('');
      user.type(inputs.emailInput, 'Deia.tech2021@gmail.com');
      expect(inputs.emailInput.value).toBe('Deia.tech2021@gmail.com');
      user.type(inputs.emailInput, '{selectall}{backspace}');
      expect(inputs.emailInput.value).toBe('');

      testTextInputs(textInputsArray);
    });
  });
});
