import { renderWithProviders } from '../../test-utils';
import { portfolioElements } from '../helpers/createElements/portfolio';
import { testOpacitySlider } from '../helpers/testElements/testSlider';
import {
  testTextInputs,
  testNumberInputs,
  testCheckboxInputs,
  testRatingInput,
  testSort,
  testQueryInputs,
  testMultiNumberInputs,
  testMultiCheckBoxInputs,
  testQueryBtns,
  testQueryBtn,
} from '../helpers/testElements/testActions';
import FetchForm from '../../features/portfolio/forms/FetchForm';

describe('Fetch Form', () => {
  beforeEach(() => renderWithProviders(<FetchForm />));

  describe('Render', () => {
    it('should render the fetch form, opacity slider, bye bye icon & fetch it btn', async () => {
      const formObj = portfolioElements({
        fetchForm: true,
        opacitySlider: true,
        byeByeIcon: true,
        fetchItBtn: true,
      });

      expect(formObj.fetchForm).toBeInTheDocument();
      expect(formObj.opacitySlider).toBeInTheDocument();
      expect(formObj.byeByeIcon).toBeInTheDocument();
      expect(formObj.fetchItBtn).toBeInTheDocument();
    });

    it('should render the url', () => {
      const urlObj = portfolioElements({ url: true });

      expect(urlObj.url).toBeInTheDocument();
      expect(urlObj.fullUrl).toBeInTheDocument();
    });

    it('should render the sort query fieldset', () => {
      const sortSet = portfolioElements({ sortSet: true });

      expect(sortSet.sortCheckBox).toBeInTheDocument();
      expect(sortSet.sortLabel).toBeInTheDocument();
      expect(sortSet.sortSelector).toBeInTheDocument();
      expect(sortSet.projectNameOption).toBeInTheDocument();
      expect(sortSet.projectSizeOption).toBeInTheDocument();
      expect(sortSet.ratingOption).toBeInTheDocument();
      expect(sortSet.createdAtOption).toBeInTheDocument();
      expect(sortSet.yearOption).toBeInTheDocument();
      expect(sortSet.durationOption).toBeInTheDocument();
    });

    it('should render the project name query fieldset', () => {
      const projectNameSet = portfolioElements({ projectNameSet: true });

      expect(projectNameSet.projectNameCheckBox).toBeInTheDocument();
      expect(projectNameSet.projectNameLabel).toBeInTheDocument();
      expect(projectNameSet.projectNameInput).toBeInTheDocument();
    });

    it('should render the version query fieldset', () => {
      const versionSet = portfolioElements({ versionSet: true });

      expect(versionSet.versionCheckBox).toBeInTheDocument();
      expect(versionSet.versionLabel).toBeInTheDocument();
      expect(versionSet.versionInput).toBeInTheDocument();
    });

    it('should render the rating query fieldset', () => {
      const ratingSet = portfolioElements({ ratingSet: true });

      expect(ratingSet.ratingCheckBox).toBeInTheDocument();
      expect(ratingSet.ratingLabel).toBeInTheDocument();
      expect(ratingSet.gteLabel).toBeInTheDocument();
      expect(ratingSet.gteInput).toBeInTheDocument();
      expect(ratingSet.gtLabel).toBeInTheDocument();
      expect(ratingSet.gtInput).toBeInTheDocument();
      expect(ratingSet.eqLabel).toBeInTheDocument();
      expect(ratingSet.eqInput).toBeInTheDocument();
      expect(ratingSet.ltLabel).toBeInTheDocument();
      expect(ratingSet.ltInput).toBeInTheDocument();
      expect(ratingSet.lteLabel).toBeInTheDocument();
      expect(ratingSet.lteInput).toBeInTheDocument();
    });

    it('should render the commercial query fieldset', () => {
      const commercialSet = portfolioElements({ commercialSet: true });

      expect(commercialSet.commercialCheckBox).toBeInTheDocument();
      expect(commercialSet.commercialLabel).toBeInTheDocument();
      expect(commercialSet.commercialTrueBtn).toBeInTheDocument();
      expect(commercialSet.commercialFalseBtn).toBeInTheDocument();
    });

    it('should render the responsive query fieldset', () => {
      const responsiveSet = portfolioElements({ responsiveSet: true });

      expect(responsiveSet.responsiveCheckBox).toBeInTheDocument();
      expect(responsiveSet.responsiveLabel).toBeInTheDocument();
      expect(responsiveSet.responsiveTrueBtn).toBeInTheDocument();
      expect(responsiveSet.responsiveFalseBtn).toBeInTheDocument();
    });

    it('should render the frontend query fieldset', () => {
      const frontEndSet = portfolioElements({ frontEndSet: true });

      expect(frontEndSet.frontEndCheckBox).toBeInTheDocument();
      expect(frontEndSet.frontEndLabel).toBeInTheDocument();
      expect(frontEndSet.frontEndTrueBtn).toBeInTheDocument();
    });

    it('should render the backend query fieldset', () => {
      const backEndSet = portfolioElements({ backEndSet: true });

      expect(backEndSet.backEndCheckBox).toBeInTheDocument();
      expect(backEndSet.backEndLabel).toBeInTheDocument();
      expect(backEndSet.backEndTrueBtn).toBeInTheDocument();
    });

    it('should render the fullstack query fieldset', () => {
      const fullStackSet = portfolioElements({ fullStackSet: true });

      expect(fullStackSet.fullStackCheckBox).toBeInTheDocument();
      expect(fullStackSet.fullStackLabel).toBeInTheDocument();
      expect(fullStackSet.fullStackTrueBtn).toBeInTheDocument();
    });

    it('should render the technologies query fieldset', async () => {
      const technologiesSet = portfolioElements({ technologiesSet: true });

      expect(technologiesSet.technologiesCheckBox).toBeInTheDocument();
      expect(technologiesSet.technologiesLabel).toBeInTheDocument();
    });

    it('should render the tested with query fieldset', () => {
      const testedWithSet = portfolioElements({ testedWithSet: true });

      expect(testedWithSet.testedWithCheckBox).toBeInTheDocument();
      expect(testedWithSet.testedWithLabel).toBeInTheDocument();
      expect(testedWithSet.chromeImg).toBeInTheDocument();
      expect(testedWithSet.chromeCheckBox).toBeInTheDocument();
      expect(testedWithSet.fireFoxImg).toBeInTheDocument();
      expect(testedWithSet.fireFoxCheckBox).toBeInTheDocument();
      expect(testedWithSet.safariImg).toBeInTheDocument();
      expect(testedWithSet.safariCheckBox).toBeInTheDocument();
    });

    it('should render the duration query fieldset', () => {
      const durationSet = portfolioElements({ durationSet: true });

      expect(durationSet.durationCheckBox).toBeInTheDocument();
      expect(durationSet.durationLabel).toBeInTheDocument();
      expect(durationSet.gteLabel).toBeInTheDocument();
      expect(durationSet.gteInput).toBeInTheDocument();
      expect(durationSet.gtLabel).toBeInTheDocument();
      expect(durationSet.gtInput).toBeInTheDocument();
      expect(durationSet.eqLabel).toBeInTheDocument();
      expect(durationSet.eqInput).toBeInTheDocument();
      expect(durationSet.ltLabel).toBeInTheDocument();
      expect(durationSet.ltInput).toBeInTheDocument();
      expect(durationSet.lteLabel).toBeInTheDocument();
      expect(durationSet.lteInput).toBeInTheDocument();
    });

    it('should render the year query fieldset', () => {
      const yearSet = portfolioElements({ yearSet: true });

      expect(yearSet.yearCheckBox).toBeInTheDocument();
      expect(yearSet.yearLabel).toBeInTheDocument();
      expect(yearSet.yearInput).toBeInTheDocument();
    });
  });

  describe('User Events', () => {
    it('should be able to change the slider value based on the user choice', () => {
      const { fetchForm, opacitySlider } = portfolioElements({
        fetchForm: true,
        opacitySlider: true,
      });

      testOpacitySlider(fetchForm, opacitySlider, 20);
    });

    it('should be able to type / check & delete / uncheck into the form inputs & the input value change accordingly', () => {
      const textInputs = portfolioElements({
        projectNameSet: true,
        versionSet: true,
      });

      const checkBoxInputs = portfolioElements({ testedWithSet: true });

      const ratingSet = portfolioElements({ ratingSet: true });

      const durationSet = portfolioElements({ durationSet: true });

      const textInputsArray = [
        textInputs.projectNameInput,
        textInputs.versionInput,
      ];

      const checkBoxInputsArray = [
        checkBoxInputs.chromeCheckBox,
        checkBoxInputs.fireFoxCheckBox,
        checkBoxInputs.safariCheckBox,
      ];

      const numberInputsArray = [
        durationSet.gteInput,
        durationSet.gtInput,
        durationSet.eqInput,
        durationSet.ltInput,
        durationSet.lteInput,
      ];

      testTextInputs(textInputsArray);
      testCheckboxInputs(checkBoxInputsArray);
      testNumberInputs(numberInputsArray);
      testRatingInput({ input: ratingSet.gteInput, num: 6, expectedValue: 5 });
      testRatingInput({ input: ratingSet.gtInput, num: 5, expectedValue: 4.9 });
      testRatingInput({ input: ratingSet.eqInput, num: 4 });
      testRatingInput({ input: ratingSet.ltInput, num: 0 });
      testRatingInput({
        input: ratingSet.lteInput,
        num: -1,
        expectedValue: '',
      });
    });

    it('should be able to select any option within the sort selector & the url change accordingly', () => {
      const sortSet = portfolioElements({ sortSet: true });

      testSort(sortSet);
    });

    it('should be able to type into the projectName input & the url change accordingly', () => {
      const projectNameSet = portfolioElements({ projectNameSet: true });

      testQueryInputs({
        queryCheckBox: projectNameSet.projectNameCheckBox,
        queryLabel: projectNameSet.projectNameLabel,
        queryInput: projectNameSet.projectNameInput,
        text: 'portfolio',
        queryUrl: 'projectName',
      });
    });

    it('should be able to type into the version input & the url change accordingly', () => {
      const versionSet = portfolioElements({ versionSet: true });

      testQueryInputs({
        queryCheckBox: versionSet.versionCheckBox,
        queryLabel: versionSet.versionLabel,
        queryInput: versionSet.versionInput,
        text: 'v2',
        queryUrl: 'version',
      });
    });

    it('should be able to type into the rating inputs & the url change accordingly', () => {
      const ratingSet = portfolioElements({ ratingSet: true });

      testMultiNumberInputs({
        queryCheckBox: ratingSet.ratingCheckBox,
        gteInput: ratingSet.gteInput,
        gtInput: ratingSet.gtInput,
        eqInput: ratingSet.eqInput,
        ltInput: ratingSet.ltInput,
        lteInput: ratingSet.lteInput,
        queryUrl: 'rating',
      });
    });

    it('should be able to click the commercial btns & the url change accordingly', () => {
      const commercialSet = portfolioElements({ commercialSet: true });

      testQueryBtns({
        queryCheckBox: commercialSet.commercialCheckBox,
        queryLabel: commercialSet.commercialLabel,
        trueBtn: commercialSet.commercialTrueBtn,
        falseBtn: commercialSet.commercialFalseBtn,
        trueQueryUrl: 'commercial=true',
        falseQueryUrl: 'commercial=false',
      });
    });

    it('should be able to click the responsive btns & the url change accordingly', () => {
      const responsiveSet = portfolioElements({ responsiveSet: true });

      testQueryBtns({
        queryCheckBox: responsiveSet.responsiveCheckBox,
        queryLabel: responsiveSet.responsiveLabel,
        trueBtn: responsiveSet.responsiveTrueBtn,
        falseBtn: responsiveSet.responsiveFalseBtn,
        trueQueryUrl: 'responsive=true',
        falseQueryUrl: 'responsive=false',
      });
    });

    it('should be able to click the frontend btn & the url change accordingly', () => {
      const frontEndSet = portfolioElements({ frontEndSet: true });

      testQueryBtn({
        queryCheckBox: frontEndSet.frontEndCheckBox,
        queryLabel: frontEndSet.frontEndLabel,
        trueBtn: frontEndSet.frontEndTrueBtn,
        trueQueryUrl: 'frontEnd=true',
      });
    });

    it('should be able to click the backend btn & the url change accordingly', () => {
      const backEndSet = portfolioElements({ backEndSet: true });

      testQueryBtn({
        queryCheckBox: backEndSet.backEndCheckBox,
        queryLabel: backEndSet.backEndLabel,
        trueBtn: backEndSet.backEndTrueBtn,
        trueQueryUrl: 'backEnd=true',
      });
    });

    it('should be able to click the fullstack btn & the url change accordingly', () => {
      const fullStackSet = portfolioElements({ fullStackSet: true });

      testQueryBtn({
        queryCheckBox: fullStackSet.fullStackCheckBox,
        queryLabel: fullStackSet.fullStackLabel,
        trueBtn: fullStackSet.fullStackTrueBtn,
        trueQueryUrl: 'fullStack=true',
      });
    });

    it('should be able to type into the testedwith inputs & the url change accordingly', () => {
      testMultiCheckBoxInputs();
    });

    it('should be able to type into the duration inputs & the url change accordingly', () => {
      const durationSet = portfolioElements({ durationSet: true });

      testMultiNumberInputs({
        queryCheckBox: durationSet.durationCheckBox,
        gteInput: durationSet.gteInput,
        gtInput: durationSet.gtInput,
        eqInput: durationSet.eqInput,
        ltInput: durationSet.ltInput,
        lteInput: durationSet.lteInput,
        queryUrl: 'duration',
      });
    });

    it('should be able to type into the year input & the url change accordingly', () => {
      const yearSet = portfolioElements({ yearSet: true });

      testQueryInputs({
        queryCheckBox: yearSet.yearCheckBox,
        queryLabel: yearSet.yearLabel,
        queryInput: yearSet.yearInput,
        text: '2022',
        queryUrl: 'year',
      });
    });
  });
});
