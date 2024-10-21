import { screen, within } from '@testing-library/react';

export const portfolioElements = ({
  portfolioPage,
  titles,
  queryBtns,
  projectsList,
  portfolioForms,
  // project form
  projectForm,
  projectFormInputs,
  projectFormSwitches,
  imgFieldset,
  uiFieldset,
  serverFieldset,
  testedWithFieldset,
  projectFormBtns,
  // fetch form
  fetchForm,
  url,
  sortSet,
  optionArticle,
  fetchFormInputs,
  projectNameSet,
  versionSet,
  ratingSet,
  commercialSet,
  responsiveSet,
  frontEndSet,
  backEndSet,
  fullStackSet,
  technologiesSet,
  testedWithSet,
  durationSet,
  yearSet,
  fetchItBtn,
  // common elements
  opacitySlider,
  byeByeIcon,
}) => {
  const obj = {};

  if (portfolioPage) {
    obj.portfolioPage = screen.queryByRole('region', { name: /portfolio/i });
  }
  if (titles) {
    obj.pageTitle = screen.getByRole('heading', { name: /my portfolio/i });
    obj.pageSubTitle = screen.getByRole('heading', { name: /my projects/i });
  }
  if (queryBtns) {
    obj.allProjectsBtn = screen.getByRole('button', { name: 'All Projects' });
    obj.mernStackBtn = screen.getByRole('button', { name: 'MERN Stack' });
    obj.reactJsBtn = screen.getByRole('button', { name: 'React Js' });
    obj.javascriptBtn = screen.getByRole('button', { name: 'Javascript' });
  }
  if (projectsList) {
    obj.projectsList = screen.getByRole('region', { name: 'Projects list' });
  }

  // project form
  if (projectForm || portfolioForms) {
    obj.projectForm = screen.queryByRole('form', { name: 'Project form' });
  }
  if (projectFormInputs) {
    obj.projectNameLabel = screen.getByText('Project Name:');
    obj.projectNameInput = screen.getByRole('textbox', {
      name: 'Project Name:',
    });
    obj.commercialLabel = screen.getByText('Commercial');
    obj.commercialInput = screen.getByRole('checkbox', {
      name: 'Commercial',
    });
    obj.responsiveLabel = screen.getByText('Responsive');
    obj.responsiveInput = screen.getByRole('checkbox', {
      name: 'Responsive',
    });
    obj.ratingLabel = screen.getByText('Rating:');
    obj.ratingInput = screen.getByRole('spinbutton', {
      name: 'Rating:',
    });
    obj.startingDateLabel = screen.getByText('Starting Date:');
    obj.startingDateInput = screen.getByRole('textbox', {
      name: 'Starting Date:',
    });
    obj.finishingDateLabel = screen.getByText('Finishing Date:');
    obj.finishingDateInput = screen.getByRole('textbox', {
      name: 'Finishing Date:',
    });
  }
  if (projectFormSwitches) {
    obj.ImgSwitchLabel = screen.getByText('Image');
    obj.ImgSwitch = screen.getByRole('checkbox', {
      name: 'Image',
    });
    obj.technologiesSwitchLabel = screen.getByText('Technologies');
    obj.technologiesSwitch = screen.getByRole('checkbox', {
      name: 'Technologies',
    });
    obj.uiSwitchLabel = screen.getByText('UI');
    obj.uiSwitch = screen.getByRole('checkbox', {
      name: 'UI',
    });
    obj.serverSwitchLabel = screen.getByText('Server');
    obj.serverSwitch = screen.getByRole('checkbox', {
      name: 'Server',
    });
    obj.testedWithSwitchLabel = screen.getByText('Tested With');
    obj.testedWithSwitch = screen.getByRole('checkbox', {
      name: 'Tested With',
    });
  }
  if (imgFieldset) {
    obj.dropBoxInput = screen.queryByTestId('drop-box');
    obj.uploadImg = screen.queryByRole('img', { name: /upload/i });
    obj.spanText = screen.queryByText(/drag & drop your project image here/i);
  }
  if (uiFieldset) {
    obj.uiLiveDemoLabel = screen.queryByText('Live Demo Link:');
    obj.uiLiveDemoInput = screen.queryByRole('textbox', {
      name: 'Live Demo Link:',
    });
    obj.uiDownloadLabel = screen.queryByText('Download Link:');
    obj.uiDownloadInput = screen.queryByRole('textbox', {
      name: 'Download Link:',
    });
    obj.uiPackageJsonLabel = screen.queryByText('Package Json:');
    obj.uiPackageJsonInput = screen.queryByRole('textbox', {
      name: 'Package Json:',
    });
  }
  if (serverFieldset) {
    obj.serverLiveDemoLabel = screen.queryByText('Live Demo Link:');
    obj.serverLiveDemoInput = screen.queryByRole('textbox', {
      name: 'Live Demo Link:',
    });
    obj.serverDownloadLabel = screen.queryByText('Download Link:');
    obj.serverDownloadInput = screen.queryByRole('textbox', {
      name: 'Download Link:',
    });
    obj.serverPackageJsonLabel = screen.queryByText('Package Json:');
    obj.serverPackageJsonInput = screen.queryByRole('textbox', {
      name: 'Package Json:',
    });
  }
  if (testedWithFieldset) {
    obj.chromeImg = screen.queryByRole('img', { name: /chrome/i });
    obj.chromeCheckbox = screen.queryByRole('checkbox', {
      name: /chrome/i,
    });
    obj.firefoxImg = screen.queryByRole('img', { name: /firefox/i });
    obj.firefoxCheckbox = screen.queryByRole('checkbox', {
      name: /firefox/i,
    });
    obj.safariImg = screen.queryByRole('img', { name: /safari/i });
    obj.safariCheckbox = screen.queryByRole('checkbox', {
      name: /safari/i,
    });
  }
  if (projectFormBtns) {
    obj.createBtn = screen.queryByRole('button', { name: 'Create' });
    obj.updateBtn = screen.queryByRole('button', { name: 'Update' });
    obj.deleteBtn = screen.queryByRole('button', { name: 'Delete' });
  }

  // fetch form
  if (fetchForm || portfolioForms) {
    obj.fetchForm = screen.queryByRole('form', { name: 'Fetch form' });
  }
  if (url || fetchForm) {
    obj.url = screen.getByText('URL:');
    obj.fullUrl = screen.getByText(/http/i);
  }
  if (sortSet || fetchFormInputs) {
    obj.sortCheckBox = screen.getByRole('checkbox', { name: 'Sort:' });
    obj.sortLabel = screen.getByText('Sort:');
    obj.sortSec = screen.getByRole('region', { name: 'Sort' });
    obj.sortSelector = screen.getByRole('combobox');
    obj.projectNameOption = screen.getByRole('option', { name: /name/i });
    obj.projectSizeOption = screen.getByRole('option', { name: /size/i });
    obj.ratingOption = screen.getByRole('option', { name: /rating/i });
    obj.createdAtOption = screen.getByRole('option', { name: /created/i });
    obj.yearOption = screen.getByRole('option', { name: /year/i });
    obj.durationOption = screen.getByRole('option', { name: /duration/i });
  }
  if (optionArticle) {
    const articleName = `Sort by ${optionArticle.toLowerCase()}`;
    const article = screen.getByRole('article', { name: articleName });
    const optionInput = within(article).getByPlaceholderText('+ / -');
    const optionBtn = within(article).getByRole('button', { name: /arrows/i });
    const optionBtnImg = within(optionBtn).getByRole('img', {
      name: /arrows/i,
    });
    const closeBtn = within(article).getByRole('button', { name: /remove/i });
    const closeImg = within(closeBtn).getByRole('img', { name: /remove/i });

    obj.optionArticle = article;
    obj.optionInput = optionInput;
    obj.optionBtn = optionBtn;
    obj.optionBtnImg = optionBtnImg;
    obj.closeBtn = closeBtn;
    obj.closeImg = closeImg;
  }
  if (projectNameSet || fetchFormInputs) {
    obj.projectNameCheckBox = screen.getByRole('checkbox', {
      name: 'Project Name:',
    });
    obj.projectNameLabel = screen.getByText('Project Name:');
    obj.projectNameInput = screen.getByPlaceholderText(
      'Project name with or without the version'
    );
  }
  if (versionSet || fetchFormInputs) {
    obj.versionCheckBox = screen.getByRole('checkbox', {
      name: 'Version:',
    });
    obj.versionLabel = screen.getByText('Version:');
    obj.versionInput = screen.getByPlaceholderText(
      'Vnumber, ex (V1 / v1), or leave empty to get all versions'
    );
  }
  if (ratingSet || fetchFormInputs) {
    obj.ratingCheckBox = screen.getByRole('checkbox', {
      name: 'Rating (1-5):',
    });
    obj.ratingLabel = screen.getByText('Rating (1-5):');

    const ratingInputsSec = screen.getByTestId('rating');
    const ratingInputs = within(ratingInputsSec).getAllByRole('spinbutton');

    obj.gteLabel = within(ratingInputsSec).getByText('>=');
    obj.gteInput = ratingInputs[0];
    obj.gtLabel = within(ratingInputsSec).getByText('>');
    obj.gtInput = ratingInputs[1];
    obj.eqLabel = within(ratingInputsSec).getByText('=');
    obj.eqInput = ratingInputs[2];
    obj.ltLabel = within(ratingInputsSec).getByText('<');
    obj.ltInput = ratingInputs[3];
    obj.lteLabel = within(ratingInputsSec).getByText('<=');
    obj.lteInput = ratingInputs[4];
  }
  if (commercialSet || fetchFormInputs) {
    obj.commercialCheckBox = screen.getByRole('checkbox', {
      name: 'Commercial:',
    });
    obj.commercialLabel = screen.getByText('Commercial:');

    const commercialBtnsSec = screen.getByTestId('commercial');

    obj.commercialTrueBtn = within(commercialBtnsSec).getByRole('button', {
      name: 'True',
    });
    obj.commercialFalseBtn = within(commercialBtnsSec).getByRole('button', {
      name: 'False',
    });
  }
  if (responsiveSet || fetchFormInputs) {
    obj.responsiveCheckBox = screen.getByRole('checkbox', {
      name: 'Responsive:',
    });
    obj.responsiveLabel = screen.getByText('Responsive:');

    const responsiveBtnsSec = screen.getByTestId('responsive');

    obj.responsiveTrueBtn = within(responsiveBtnsSec).getByRole('button', {
      name: 'True',
    });
    obj.responsiveFalseBtn = within(responsiveBtnsSec).getByRole('button', {
      name: 'False',
    });
  }
  if (frontEndSet || fetchFormInputs) {
    obj.frontEndCheckBox = screen.getByRole('checkbox', {
      name: 'Front-End:',
    });
    obj.frontEndLabel = screen.getByText('Front-End:');

    const frontEndBtnsSec = screen.getByTestId('frontEnd');

    obj.frontEndTrueBtn = within(frontEndBtnsSec).getByRole('button', {
      name: 'True',
    });
  }
  if (backEndSet || fetchFormInputs) {
    obj.backEndCheckBox = screen.getByRole('checkbox', {
      name: 'Back-End:',
    });
    obj.backEndLabel = screen.getByText('Back-End:');

    const backEndBtnsSec = screen.getByTestId('backEnd');

    obj.backEndTrueBtn = within(backEndBtnsSec).getByRole('button', {
      name: 'True',
    });
  }
  if (fullStackSet || fetchFormInputs) {
    obj.fullStackCheckBox = screen.getByRole('checkbox', {
      name: 'Full Stack:',
    });
    obj.fullStackLabel = screen.getByText('Full Stack:');

    const fullstackBtnsSec = screen.getByTestId('fullStack');

    obj.fullStackTrueBtn = within(fullstackBtnsSec).getByRole('button', {
      name: 'True',
    });
  }
  if (technologiesSet || fetchFormInputs) {
    obj.technologiesCheckBox = screen.getByRole('checkbox', {
      name: 'Technologies:',
    });
    obj.technologiesLabel = screen.getByText('Technologies:');
  }
  if (testedWithSet || fetchFormInputs) {
    obj.testedWithCheckBox = screen.getByRole('checkbox', {
      name: 'Tested With:',
    });
    obj.testedWithLabel = screen.getByText('Tested With:');

    const testedWithInputsSec = screen.getByTestId('testedWith');
    const testedWithCheckBoxes =
      within(testedWithInputsSec).getAllByRole('checkbox');

    obj.chromeImg = within(testedWithInputsSec).getByRole('img', {
      name: 'Chrome',
    });
    obj.chromeCheckBox = testedWithCheckBoxes[0];
    obj.fireFoxImg = within(testedWithInputsSec).getByRole('img', {
      name: 'Firefox',
    });
    obj.fireFoxCheckBox = testedWithCheckBoxes[1];
    obj.safariImg = within(testedWithInputsSec).getByRole('img', {
      name: 'Safari',
    });
    obj.safariCheckBox = testedWithCheckBoxes[2];
  }
  if (durationSet || fetchFormInputs) {
    obj.durationCheckBox = screen.getByRole('checkbox', {
      name: 'Duration (days):',
    });
    obj.durationLabel = screen.getByText('Duration (days):');

    const durationInputsSec = screen.getByTestId('duration');
    const durationInputs = within(durationInputsSec).getAllByRole('spinbutton');

    obj.gteLabel = within(durationInputsSec).getByText('>=');
    obj.gteInput = durationInputs[0];
    obj.gtLabel = within(durationInputsSec).getByText('>');
    obj.gtInput = durationInputs[1];
    obj.eqLabel = within(durationInputsSec).getByText('=');
    obj.eqInput = durationInputs[2];
    obj.ltLabel = within(durationInputsSec).getByText('<');
    obj.ltInput = durationInputs[3];
    obj.lteLabel = within(durationInputsSec).getByText('<=');
    obj.lteInput = durationInputs[4];
  }
  if (yearSet || fetchFormInputs) {
    obj.yearCheckBox = screen.getByRole('checkbox', { name: 'Year:' });
    obj.yearLabel = screen.getByText('Year:');
    obj.yearInput = screen.getByPlaceholderText(/2022/);
  }
  if (fetchItBtn || fetchFormInputs) {
    obj.fetchItBtn = screen.getByRole('button', { name: 'Fetch IT' });
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
