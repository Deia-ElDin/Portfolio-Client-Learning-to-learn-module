import { renderWithProviders } from '../../test-utils';
import { homeElements } from '../helpers/createElements/home';
import { testOpacitySlider } from '../helpers/testElements/testSlider';
import ProfileForm from '../../features/home/ProfileForm';

describe('Profile Form', () => {
  beforeEach(() => renderWithProviders(<ProfileForm />));

  describe('Render', () => {
    it('should render the profile form with all the elements included', async () => {
      const profileForm = homeElements({
        profileForm: true,
        opacitySlider: true,
        byeByeIcon: true,
        profileInput: true,
      });

      expect(profileForm.profileForm).toBeInTheDocument();
      expect(profileForm.opacitySlider).toBeInTheDocument();
      expect(profileForm.byeByeIcon).toBeInTheDocument();
      expect(profileForm.dropBoxInput).toBeInTheDocument();
      expect(profileForm.uploadImg).toBeInTheDocument();
      expect(profileForm.spanText).toBeInTheDocument();
      expect(profileForm.createBtn).toBeInTheDocument();
    });
  });

  describe('User Events', () => {
    it('should be able to change the slider value based on the user choice', () => {
      const { profileForm, opacitySlider } = homeElements({
        profileForm: true,
        opacitySlider: true,
      });

      testOpacitySlider(profileForm, opacitySlider, 100);
    });
  });
});
