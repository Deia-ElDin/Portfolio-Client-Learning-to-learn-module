import { renderWithProviders } from '../../test-utils';
import { portfolioElements } from '../helpers/createElements/portfolio';
import { testOpacitySlider } from '../helpers/testElements/testSlider';
import {
  testTextInputs,
  testRatingInput,
  testCheckboxInputs,
} from '../helpers/testElements/testActions';
import user from '@testing-library/user-event';
import ProjectForm from '../../features/portfolio/forms/ProjectForm';

describe('Project Form', () => {
  beforeEach(() => renderWithProviders(<ProjectForm />));

  describe('Render', () => {
    it('should render the project form with all the elements included', () => {
      const projectForm = portfolioElements({
        projectForm: true,
        projectFormInputs: true,
        projectFormSwitches: true,
        projectFormBtns: true,
        opacitySlider: true,
        byeByeIcon: true,
      });

      expect(projectForm.projectForm).toBeInTheDocument();
      expect(projectForm.opacitySlider).toBeInTheDocument();
      expect(projectForm.byeByeIcon).toBeInTheDocument();
      expect(projectForm.projectNameLabel).toBeInTheDocument();
      expect(projectForm.projectNameInput).toBeInTheDocument();
      expect(projectForm.commercialLabel).toBeInTheDocument();
      expect(projectForm.commercialInput).toBeInTheDocument();
      expect(projectForm.responsiveLabel).toBeInTheDocument();
      expect(projectForm.responsiveInput).toBeInTheDocument();
      expect(projectForm.ratingLabel).toBeInTheDocument();
      expect(projectForm.ratingInput).toBeInTheDocument();
      expect(projectForm.startingDateLabel).toBeInTheDocument();
      expect(projectForm.startingDateInput).toBeInTheDocument();
      expect(projectForm.finishingDateLabel).toBeInTheDocument();
      expect(projectForm.finishingDateInput).toBeInTheDocument();
      expect(projectForm.ImgSwitchLabel).toBeInTheDocument();
      expect(projectForm.ImgSwitch).toBeInTheDocument();
      expect(projectForm.technologiesSwitchLabel).toBeInTheDocument();
      expect(projectForm.technologiesSwitch).toBeInTheDocument();
      expect(projectForm.uiSwitchLabel).toBeInTheDocument();
      expect(projectForm.uiSwitch).toBeInTheDocument();
      expect(projectForm.serverSwitchLabel).toBeInTheDocument();
      expect(projectForm.serverSwitch).toBeInTheDocument();
      expect(projectForm.testedWithSwitchLabel).toBeInTheDocument();
      expect(projectForm.testedWithSwitch).toBeInTheDocument();
      expect(projectForm.createBtn).toBeInTheDocument();
      expect(projectForm.updateBtn).not.toBeInTheDocument();
      expect(projectForm.deleteBtn).not.toBeInTheDocument();
    });

    it('should render the img fieldset after clicking on the img switch btn', () => {
      const { ImgSwitchLabel, ImgSwitch } = portfolioElements({
        projectFormSwitches: true,
      });

      // initially should not be in the document
      const imgFieldset1 = portfolioElements({ imgFieldset: true });
      expect(imgFieldset1.dropBoxInput).not.toBeInTheDocument();
      expect(imgFieldset1.uploadImg).not.toBeInTheDocument();
      expect(imgFieldset1.spanText).not.toBeInTheDocument();

      // testing the swtich label
      user.click(ImgSwitchLabel);
      const imgFieldset2 = portfolioElements({ imgFieldset: true });
      expect(imgFieldset2.dropBoxInput).toBeInTheDocument();
      expect(imgFieldset2.uploadImg).toBeInTheDocument();
      expect(imgFieldset2.spanText).toBeInTheDocument();

      // testing the swtich
      user.click(ImgSwitch);
      expect(imgFieldset2.dropBoxInput).not.toBeInTheDocument();
      expect(imgFieldset2.uploadImg).not.toBeInTheDocument();
      expect(imgFieldset2.spanText).not.toBeInTheDocument();
    });

    it('should render the ui fieldset after clicking on the ui switch btn', () => {
      const { uiSwitchLabel, uiSwitch } = portfolioElements({
        projectFormSwitches: true,
      });

      // initially should not be in the document
      const uiFieldset1 = portfolioElements({ uiFieldset: true });
      expect(uiFieldset1.uiLiveDemoLabel).not.toBeInTheDocument();
      expect(uiFieldset1.uiLiveDemoInput).not.toBeInTheDocument();
      expect(uiFieldset1.uiDownloadLabel).not.toBeInTheDocument();
      expect(uiFieldset1.uiDownloadInput).not.toBeInTheDocument();
      expect(uiFieldset1.uiPackageJsonLabel).not.toBeInTheDocument();
      expect(uiFieldset1.uiPackageJsonInput).not.toBeInTheDocument();

      // testing the swtich label
      user.click(uiSwitchLabel);
      const uiFieldset2 = portfolioElements({ uiFieldset: true });
      expect(uiFieldset2.uiLiveDemoLabel).toBeInTheDocument();
      expect(uiFieldset2.uiLiveDemoInput).toBeInTheDocument();
      expect(uiFieldset2.uiDownloadLabel).toBeInTheDocument();
      expect(uiFieldset2.uiDownloadInput).toBeInTheDocument();
      expect(uiFieldset2.uiPackageJsonLabel).toBeInTheDocument();
      expect(uiFieldset2.uiPackageJsonInput).toBeInTheDocument();

      // testing the swtich
      user.click(uiSwitch);
      expect(uiFieldset2.uiLiveDemoLabel).not.toBeInTheDocument();
      expect(uiFieldset2.uiLiveDemoInput).not.toBeInTheDocument();
      expect(uiFieldset2.uiDownloadLabel).not.toBeInTheDocument();
      expect(uiFieldset2.uiDownloadInput).not.toBeInTheDocument();
      expect(uiFieldset2.uiPackageJsonLabel).not.toBeInTheDocument();
      expect(uiFieldset2.uiPackageJsonInput).not.toBeInTheDocument();
    });

    it('should render the server fieldset after clicking on the server switch btn', () => {
      const { serverSwitchLabel, serverSwitch } = portfolioElements({
        projectFormSwitches: true,
      });

      // initially should not be in the document
      const serverFieldset1 = portfolioElements({ serverFieldset: true });
      expect(serverFieldset1.serverLiveDemoLabel).not.toBeInTheDocument();
      expect(serverFieldset1.serverLiveDemoInput).not.toBeInTheDocument();
      expect(serverFieldset1.serverDownloadLabel).not.toBeInTheDocument();
      expect(serverFieldset1.serverDownloadInput).not.toBeInTheDocument();
      expect(serverFieldset1.serverPackageJsonLabel).not.toBeInTheDocument();
      expect(serverFieldset1.serverPackageJsonInput).not.toBeInTheDocument();

      // testing the swtich label
      user.click(serverSwitchLabel);
      const serverFieldset2 = portfolioElements({ serverFieldset: true });
      expect(serverFieldset2.serverLiveDemoLabel).toBeInTheDocument();
      expect(serverFieldset2.serverLiveDemoInput).toBeInTheDocument();
      expect(serverFieldset2.serverDownloadLabel).toBeInTheDocument();
      expect(serverFieldset2.serverDownloadInput).toBeInTheDocument();
      expect(serverFieldset2.serverPackageJsonLabel).toBeInTheDocument();
      expect(serverFieldset2.serverPackageJsonInput).toBeInTheDocument();

      // testing the swtich
      user.click(serverSwitch);
      expect(serverFieldset2.serverLiveDemoLabel).not.toBeInTheDocument();
      expect(serverFieldset2.serverLiveDemoInput).not.toBeInTheDocument();
      expect(serverFieldset2.serverDownloadLabel).not.toBeInTheDocument();
      expect(serverFieldset2.serverDownloadInput).not.toBeInTheDocument();
      expect(serverFieldset2.serverPackageJsonLabel).not.toBeInTheDocument();
      expect(serverFieldset2.serverPackageJsonInput).not.toBeInTheDocument();
    });
  });

  describe('User Events', () => {
    it('should render the testedWith fieldset after clicking on the testedWith switch btn', () => {
      const { testedWithSwitchLabel, testedWithSwitch } = portfolioElements({
        projectFormSwitches: true,
      });

      // initially should not be in the document
      const testedWithFieldset1 = portfolioElements({
        testedWithFieldset: true,
      });
      expect(testedWithFieldset1.chromeImg).not.toBeInTheDocument();
      expect(testedWithFieldset1.chromeCheckbox).not.toBeInTheDocument();
      expect(testedWithFieldset1.firefoxImg).not.toBeInTheDocument();
      expect(testedWithFieldset1.firefoxCheckbox).not.toBeInTheDocument();
      expect(testedWithFieldset1.safariImg).not.toBeInTheDocument();
      expect(testedWithFieldset1.safariCheckbox).not.toBeInTheDocument();

      // testing the swtich label
      user.click(testedWithSwitchLabel);
      const testedWithFieldset2 = portfolioElements({
        testedWithFieldset: true,
      });
      expect(testedWithFieldset2.chromeImg).toBeInTheDocument();
      expect(testedWithFieldset2.chromeCheckbox).toBeInTheDocument();
      expect(testedWithFieldset2.firefoxImg).toBeInTheDocument();
      expect(testedWithFieldset2.firefoxCheckbox).toBeInTheDocument();
      expect(testedWithFieldset2.safariImg).toBeInTheDocument();
      expect(testedWithFieldset2.safariCheckbox).toBeInTheDocument();

      // testing the swtich
      user.click(testedWithSwitch);
      expect(testedWithFieldset2.chromeImg).not.toBeInTheDocument();
      expect(testedWithFieldset2.chromeCheckbox).not.toBeInTheDocument();
      expect(testedWithFieldset2.firefoxImg).not.toBeInTheDocument();
      expect(testedWithFieldset2.firefoxCheckbox).not.toBeInTheDocument();
      expect(testedWithFieldset2.safariImg).not.toBeInTheDocument();
      expect(testedWithFieldset2.safariCheckbox).not.toBeInTheDocument();
    });

    it('should be able to change the slider value based on the user choice', () => {
      const { projectForm, opacitySlider } = portfolioElements({
        projectForm: true,
        opacitySlider: true,
      });

      testOpacitySlider(projectForm, opacitySlider, 50);
    });

    it('should be able to type / check & delete / uncheck into the form inputs & the input value change accordingly', () => {
      const inputs = portfolioElements({ projectFormInputs: true });

      const textInputsArray = [
        inputs.projectNameInput,
        inputs.startingDateInput,
        inputs.finishingDateInput,
      ];

      const checkBoxInputsArray = [
        inputs.commercialInput,
        inputs.responsiveInput,
      ];

      testTextInputs(textInputsArray);
      testRatingInput({ input: inputs.ratingInput, num: 3 });
      testCheckboxInputs(checkBoxInputsArray);

      // typing into the ui fieldset
      const { uiSwitch } = portfolioElements({ projectFormSwitches: true });
      user.click(uiSwitch);
      const uiFieldset = portfolioElements({ uiFieldset: true });
      const uiInputs = [
        uiFieldset.uiLiveDemoInput,
        uiFieldset.uiDownloadInput,
        uiFieldset.uiPackageJsonInput,
      ];
      testTextInputs(uiInputs);

      // typing into the server fieldset
      const { serverSwitch } = portfolioElements({ projectFormSwitches: true });
      user.click(serverSwitch);
      const serverFieldset = portfolioElements({ serverFieldset: true });
      const serverInputs = [
        serverFieldset.serverLiveDemoInput,
        serverFieldset.serverDownloadInput,
        serverFieldset.serverPackageJsonInput,
      ];
      testTextInputs(serverInputs);

      // checking the inputs within the testedWith fieldset
      const { testedWithSwitch } = portfolioElements({
        projectFormSwitches: true,
      });
      user.click(testedWithSwitch);
      const testedWithFieldset = portfolioElements({
        testedWithFieldset: true,
      });
      const testedWithInputs = [
        testedWithFieldset.chromeCheckbox,
        testedWithFieldset.firefoxCheckbox,
        testedWithFieldset.safariCheckbox,
      ];
      testCheckboxInputs(testedWithInputs);
    });

    it('should not render any ratingInput values above 5 or a negative value, instead render the max value which is 5 or clear the input if the provided value were negative', () => {
      const { ratingInput } = portfolioElements({ projectFormInputs: true });

      testRatingInput({ input: ratingInput, num: -3, expectedValue: '' });
      testRatingInput({ input: ratingInput, num: 7, expectedValue: 5 });
    });
  });
});
