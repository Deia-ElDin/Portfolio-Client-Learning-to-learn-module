import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { portfolioElements } from '../createElements/portfolio';
import { BASE_URL } from '../../../app/api/apiSlice';
import {
  ascendingSvg,
  descendingSvg,
  closeSvg,
} from '../../../features/helpers/srcs/handleImgsSrc';
import user from '@testing-library/user-event';

const fetchBaseUrl = `${BASE_URL}api/v1/projects?`;

export const testTextInputs = (inptsArray) => {
  let text = 'some text';

  for (let i = 0; i < inptsArray.length; i++) {
    // checking that initially the inputs should be empty
    expect(inptsArray[i].value).toBe('');
    // typing
    user.type(inptsArray[i], `${text} - ${i}`);
    // testing the input values after typing
    expect(inptsArray[i].value).toBe(`${text} - ${i}`);
    // clear the inputs
    user.type(inptsArray[i], '{selectall}{backspace}');
    // checking the value after removing the text
    expect(inptsArray[i].value).toBe('');
  }
};

export const testNumberInputs = (inptsArray) => {
  let number = 1;

  for (let i = 0; i < inptsArray.length; i++) {
    expect(inptsArray[i].value).toBe('');
    user.type(inptsArray[i], `${number + i}`);
    expect(inptsArray[i].value).toBe(`${number + i}`);
    user.type(inptsArray[i], '{selectall}{backspace}');
    expect(inptsArray[i].value).toBe('');
  }
};

export const testCheckboxInputs = (inptsArray) => {
  for (let i = 0; i < inptsArray.length; i++) {
    expect(inptsArray[i].checked).toEqual(false);
    user.click(inptsArray[i]);
    expect(inptsArray[i].checked).toEqual(true);
    user.click(inptsArray[i]);
    expect(inptsArray[i].checked).toEqual(false);
  }
};

export const testRatingInput = ({ input, num, expectedValue }) => {
  expect(input.value).toBe('');

  user.type(input, `${num}`);
  if (num < 0) expect(input.value).toBe('');
  else if (num > 5) expect(input.value).toBe('5');
  // incase we are testing the > input within the fetch form (it can't be > 5)
  else expect(input.value).toBe(`${expectedValue ? expectedValue : num}`);

  user.type(input, '{selectall}{backspace}');
  expect(input.value).toBe('');
};

export const shouldRemoveTheErrsAfterTyping = ({
  errMsg,
  opacitySlider,
  form,
  input,
}) => {
  // Notes:
  //  1) incase we have an error, then:
  //      1- opacitySlider goes up to 100 (form background color goes black (#000))
  //      2- the form box shadow goes from white (#fff) to red (#ff0000)
  //      3- we might / not have an errIcon(s) depends on the case
  //  2) if the err occurs because of a bad request, (ex user didn't provide a mandatory data), then:
  //      - we provide an errIcon at that input(s)
  //  3) else if the user didn't login in the first place, then:
  //      - we do not provide any errIcons at all except (the loginForm)
  //  4) incase it's the LoginForm, then:
  //      - we do not provide any red box-shadows except with (Invalid Credentials Error)
  //      - we do prvode errIcons incase the user didn't fill any of the 2 inputs
  //  5) if the user back on typing after the err, then:
  //      - we clear the errMsg
  //      - we clear the errIcon(s) and errIcon(s) if there was any
  //      - opacitySlider back to (70) or whatever the user choices earlier
  //  6) non of that applied to the FetchForm
  //  7) check features/helpers/function/handleForms.js

  // incase it's loginForm
  const errBoxShadow =
    errMsg.includes('username') || errMsg.includes('password')
      ? '5px 10px 12px #fff' // white box-shadow
      : '5px 10px 12px #ff0000'; // red box-shadow

  // we have an err
  expect(opacitySlider).toHaveAttribute('value', '100'); // controls the form bgc opacity
  expect(form).toHaveStyle('background-color: #000'); // black background
  expect(form).toHaveStyle(`box-shadow: ${errBoxShadow}`);

  // user back on typing
  user.type(input, 'some text');
  expect(screen.queryByText(errMsg)).not.toBeInTheDocument(); // making sure we did clear errMsg
  expect(screen.queryAllByTestId('err-icon').length).toBe(0); // making sure we did remove any errIcons
  expect(opacitySlider).toHaveAttribute('value', '70'); // opacitySlider back to the previous value
  expect(form).toHaveStyle('box-shadow: 5px 10px 12px #fff'); // box-shadow back to white
  expect(form).toHaveStyle('background-color: rgba(0, 0, 0, 0.7)'); // bgc back to the previous value
};

export const testSort = async (sortSet) => {
  const { fullUrl } = portfolioElements({ url: true });

  const {
    sortCheckBox,
    sortLabel,
    sortSec,
    sortSelector,
    projectNameOption,
    projectSizeOption,
    ratingOption,
    createdAtOption,
    yearOption,
    durationOption,
  } = sortSet;

  const initialExpects = () => {
    expect(sortCheckBox).toHaveClass('off');
    expect(sortLabel).toHaveClass('off');
    expect(sortCheckBox.checked).toEqual(false);
    expect(sortSec).toHaveClass('off');
    expect(fullUrl).toHaveTextContent(`${fetchBaseUrl.slice(0, -1)}`);
  };

  const afterActionExpects = (optionUrl) => {
    expect(sortCheckBox).toHaveClass('on');
    expect(sortLabel).toHaveClass('on');
    expect(sortCheckBox.checked).toEqual(true);
    expect(sortSec).toHaveClass('on');
    expect(fullUrl).toHaveTextContent(`${fetchBaseUrl}${optionUrl}`);
  };

  const testOption = (option, optionName, optionId) => {
    const testActivatedOptionArticle = () => {
      // we pass the optionName as the optionArticle to the portfolioElements to get the active article
      // this is different than the options within the selector
      // try sortSet within fetch form for better understanding
      const {
        optionArticle,
        optionInput,
        optionBtn,
        optionBtnImg,
        closeBtn,
        closeImg,
      } = portfolioElements({ optionArticle: optionName });

      expect(optionArticle).toBeInTheDocument();
      expect(optionInput).toBeInTheDocument();
      expect(optionInput.value).toBe('');
      expect(optionBtn).toBeInTheDocument();
      expect(optionBtn).toHaveClass('active');
      expect(optionBtnImg).toBeInTheDocument();
      expect(optionBtnImg).toHaveAttribute('src', ascendingSvg);
      expect(closeBtn).toBeInTheDocument();
      expect(closeImg).toBeInTheDocument();
      expect(closeImg).toHaveAttribute('src', closeSvg);
      expect(fullUrl).toHaveTextContent(`${fetchBaseUrl}sort=${optionId}`);

      const testUserActions = async (sign) => {
        // testing the user actions:
        //  1- typing into the optionInput (+ or -)
        //  2- clicking on the optionBtn ex(Project Name) button
        //  3- clicking on sortCheckBox to activate / deactivate the sortSet
        //  4- clicking on the closeBtn

        // 1- typing into the optionInput (+ or -)
        user.type(optionInput, sign);
        await waitFor(() => {
          expect(optionInput.value).toBe(`${sign}`),
            expect(optionBtnImg).toHaveAttribute(
              'src',
              sign === '-' ? descendingSvg : ascendingSvg
            ),
            expect(fullUrl).toHaveTextContent(
              `${fetchBaseUrl}sort=${sign}${optionId}`
            );
        });

        // 2- clicking on the optionBtn
        //    1) deactivating the sortSet, classes => (off / normal) + clear the optionUrl
        user.click(optionBtn);
        initialExpects();
        expect(optionBtn).toHaveClass('normal');
        //    2) activating the sortSet, classes => (on / active), setting back the optionUrl
        user.click(optionBtn);
        afterActionExpects(`sort=${sign}${optionId}`);
        expect(optionBtn).toHaveClass('active');

        // 3- clicking on sortCheckBox to activate
        //    1) deactivating the sortSet, classes => (off / normal) + clear the optionUrl
        user.click(sortCheckBox);
        initialExpects();
        expect(optionBtn).toHaveClass('active');
        //    2) activating the sortSet, classes => (on / active), setting back the optionUrl
        user.click(sortCheckBox);
        afterActionExpects(`sort=${sign}${optionId}`);
        expect(optionBtn).toHaveClass('active');

        // clear the optionInput
        user.type(optionInput, '{selectall}{backspace}');
        expect(optionInput.value).toBe(``);

        // 4- closing the option => removing that optionArticle from the document
        user.click(closeBtn);
        await waitForElementToBeRemoved(optionArticle);
      };

      testUserActions('-');
      testUserActions('+');
    };

    // 1- we make sure the option was not selected
    expect(option.selected).toBeFalsy();

    // 2- select the option
    user.selectOptions(sortSelector, option);
    expect(option.selected).toBeTruthy();
    afterActionExpects(`sort=${optionId}`);

    // 3- test the option article which should appear in the document and it contains (input, btn, closeBtn)
    testActivatedOptionArticle(optionName, optionId);
  };

  initialExpects();

  // here we are not repeating ourselves, the most important test here is the fullUrl test
  // we make sure it changes with every option and with the changing of the optionInput values
  // and we make sure that the user can check or uncheck with whatever option he selected and the
  // fullUrl change accordingly
  testOption(projectNameOption, 'Project Name', 'projectName');
  await waitFor(() => initialExpects());

  testOption(projectSizeOption, 'Project Size', 'sumCodeLines');
  await waitFor(() => initialExpects());

  testOption(ratingOption, 'Rating', 'rating');
  await waitFor(() => initialExpects());

  testOption(createdAtOption, 'Created At', 'createdAt');
  await waitFor(() => initialExpects());

  testOption(yearOption, 'Year', 'year');
  await waitFor(() => initialExpects());

  testOption(durationOption, 'Duration', 'duration');
  await waitFor(() => initialExpects());
};

export const testQueryInputs = async ({
  queryCheckBox,
  queryLabel,
  queryInput,
  text,
  queryUrl,
}) => {
  const { fullUrl } = portfolioElements({ url: true });

  const initialExpects = () => {
    expect(queryCheckBox).toHaveClass('off');
    expect(queryLabel).toHaveClass('off');
    expect(queryCheckBox.checked).toEqual(false);
    expect(queryInput).toHaveClass('off');
    expect(fullUrl).toHaveTextContent(`${fetchBaseUrl.slice(0, -1)}`);
  };

  const afterTypingExpects = () => {
    expect(queryCheckBox).toHaveClass('on');
    expect(queryLabel).toHaveClass('on');
    expect(queryCheckBox.checked).toEqual(true);
    expect(queryInput).toHaveClass('on');
    expect(queryInput.value).toBe(text);
    expect(fullUrl).toHaveTextContent(`${fetchBaseUrl}${queryUrl}=${text}`);
  };

  initialExpects();
  expect(queryInput.value).toBe('');
  user.click(queryCheckBox);

  // nothing changes
  initialExpects();

  user.type(queryInput, text);
  afterTypingExpects();

  user.click(queryCheckBox);
  initialExpects();

  user.click(queryCheckBox);
  afterTypingExpects();

  user.type(queryInput, '{selectall}{backspace}');
  initialExpects();
};

export const testMultiNumberInputs = ({
  queryCheckBox,
  gteInput,
  gtInput,
  eqInput,
  ltInput,
  lteInput,
  queryUrl,
}) => {
  const { fullUrl } = portfolioElements({ url: true });
  const letter = queryUrl[0];

  const initialExpects = () => {
    expect(queryCheckBox).toHaveClass('off');
    expect(queryCheckBox.checked).toEqual(false);
    expect(fullUrl).toHaveTextContent(`${fetchBaseUrl.slice(0, -1)}`);
  };

  const afterTypingExpects = (fullQueryUrl) => {
    expect(queryCheckBox).toHaveClass('on');
    expect(queryCheckBox.checked).toEqual(true);
    expect(fullUrl).toHaveTextContent(`${fetchBaseUrl}${fullQueryUrl}`);
  };

  initialExpects();
  expect(gteInput.value).toBe('');
  expect(gtInput.value).toBe('');
  expect(eqInput.value).toBe('');
  expect(ltInput.value).toBe('');
  expect(lteInput.value).toBe('');

  // greater than or equal to
  const testGTEInput = () => {
    user.type(gteInput, `3`);
    expect(gteInput.value).toBe(`3`);
    afterTypingExpects(`${queryUrl}=${letter}>=3`);

    // once the user types into gteInput he won't be allowed to type into the gtInput or eqInput
    expect(gtInput).toBeDisabled();
    expect(eqInput).toBeDisabled();
    expect(ltInput).not.toBeDisabled();
    expect(lteInput).not.toBeDisabled();

    user.type(lteInput, `4`);
    expect(lteInput.value).toBe(`4`);
    afterTypingExpects(`${queryUrl}=${letter}>=3,${letter}<=4`);

    // deactivating the set
    user.click(queryCheckBox);
    initialExpects();

    // activating the set back again
    user.click(queryCheckBox);
    afterTypingExpects(`${queryUrl}=${letter}>=3,${letter}<=4`);

    // clear the inputs
    user.type(gteInput, `{selectall}{backspace}`);
    user.type(lteInput, `{selectall}{backspace}`);
    initialExpects();
  };

  // greater than
  const testGTInput = () => {
    user.type(gtInput, `2`);
    expect(gtInput.value).toBe(`2`);
    afterTypingExpects(`${queryUrl}=${letter}>2`);

    // once the user types into gtInput he won't be allowed to type into the gteInput or eqInput
    expect(gteInput).toBeDisabled();
    expect(eqInput).toBeDisabled();
    expect(ltInput).not.toBeDisabled();
    expect(lteInput).not.toBeDisabled();

    user.type(ltInput, `5`);
    expect(ltInput.value).toBe(`5`);
    afterTypingExpects(`${queryUrl}=${letter}>2,${letter}<5`);

    user.click(queryCheckBox);
    initialExpects();

    user.click(queryCheckBox);
    afterTypingExpects(`${queryUrl}=${letter}>2,${letter}<5`);

    user.type(gtInput, `{selectall}{backspace}`);
    user.type(ltInput, `{selectall}{backspace}`);
    initialExpects();
  };

  // equal to
  const testEQInput = () => {
    user.type(eqInput, `5`);
    expect(eqInput.value).toBe(`5`);
    afterTypingExpects(`${queryUrl}=${letter}=5`);

    // once the user types into eqInput he won't be allowed to type into any other input
    expect(gteInput).toBeDisabled();
    expect(gtInput).toBeDisabled();
    expect(ltInput).toBeDisabled();
    expect(lteInput).toBeDisabled();

    user.click(queryCheckBox);
    initialExpects();

    user.click(queryCheckBox);
    afterTypingExpects(`${queryUrl}=${letter}=5`);

    user.type(eqInput, `{selectall}{backspace}`);
    initialExpects();
  };

  // less than
  const testLTInput = () => {
    user.type(ltInput, `5`);
    expect(ltInput.value).toBe(`5`);
    afterTypingExpects(`${queryUrl}=${letter}<5`);

    // once the user types into ltInput he won't be allowed to type into the lteInput or eqInput
    expect(gteInput).not.toBeDisabled();
    expect(gtInput).not.toBeDisabled();
    expect(eqInput).toBeDisabled();
    expect(lteInput).toBeDisabled();

    user.type(gteInput, `3`);
    expect(gteInput.value).toBe(`3`);

    // the queries (< & >=) should switch positions based on their existence on the symbolsData
    afterTypingExpects(`${queryUrl}=${letter}>=3,${letter}<5`);

    user.click(queryCheckBox);
    initialExpects();

    user.click(queryCheckBox);
    afterTypingExpects(`${queryUrl}=${letter}>=3,${letter}<5`);

    user.type(ltInput, `{selectall}{backspace}`);
    user.type(gteInput, `{selectall}{backspace}`);
    initialExpects();
  };

  // less than or equal to
  const testLTEInput = () => {
    user.type(lteInput, `4.5`);
    expect(lteInput.value).toBe(`4.5`);
    afterTypingExpects(`${queryUrl}=${letter}<=4.5`);

    // once the user types into lteInput he won't be allowed to type into the ltInput or eqInput
    expect(gteInput).not.toBeDisabled();
    expect(gtInput).not.toBeDisabled();
    expect(eqInput).toBeDisabled();
    expect(ltInput).toBeDisabled();

    user.type(gtInput, `2.5`);
    expect(gtInput.value).toBe(`2.5`);

    // the queries (<= & >) should switch positions based on their existence on the symbolsData
    afterTypingExpects(`${queryUrl}=${letter}>2.5,${letter}<=4.5`);

    user.click(queryCheckBox);
    initialExpects();

    user.click(queryCheckBox);
    afterTypingExpects(`${queryUrl}=${letter}>2.5,${letter}<=4.5`);

    user.type(lteInput, `{selectall}{backspace}`);
    user.type(gtInput, `{selectall}{backspace}`);
    initialExpects();
  };

  testGTEInput();
  testGTInput();
  testEQInput();
  testLTInput();
  testLTEInput();
};

export const testMultiCheckBoxInputs = () => {
  const { fullUrl } = portfolioElements({ url: true });
  const {
    testedWithCheckBox,
    chromeCheckBox,
    fireFoxCheckBox,
    safariCheckBox,
  } = portfolioElements({ testedWithSet: true });

  const initialExpects = () => {
    expect(testedWithCheckBox).toHaveClass('off');
    expect(testedWithCheckBox.checked).toEqual(false);
    expect(fullUrl).toHaveTextContent(`${fetchBaseUrl.slice(0, -1)}`);
  };

  const afterTypingExpects = (fullQueryUrl) => {
    expect(testedWithCheckBox).toHaveClass('on');
    expect(testedWithCheckBox.checked).toEqual(true);
    expect(fullUrl).toHaveTextContent(`${fetchBaseUrl}${fullQueryUrl}`);
  };

  initialExpects();

  // initially we make sure non of the checkboxes were unchecked
  expect(chromeCheckBox.checked).toEqual(false);
  expect(fireFoxCheckBox.checked).toEqual(false);
  expect(safariCheckBox.checked).toEqual(false);

  user.click(chromeCheckBox);
  expect(chromeCheckBox.checked).toEqual(true);

  afterTypingExpects('testedWith=["Chrome"]');

  user.click(fireFoxCheckBox);
  expect(fireFoxCheckBox.checked).toEqual(true);
  afterTypingExpects('testedWith=["Chrome", "Firefox"]');

  user.click(safariCheckBox);
  expect(safariCheckBox.checked).toEqual(true);
  afterTypingExpects('testedWith=["Chrome", "Firefox", "Safari"]');

  // deactivating the set
  user.click(testedWithCheckBox);
  initialExpects();

  // activating the set back again
  user.click(testedWithCheckBox);
  afterTypingExpects('testedWith=["Chrome", "Firefox", "Safari"]');

  // uncheck the checkboxes
  user.click(chromeCheckBox);
  user.click(fireFoxCheckBox);
  user.click(safariCheckBox);
  expect(chromeCheckBox.checked).toEqual(false);
  expect(fireFoxCheckBox.checked).toEqual(false);
  expect(safariCheckBox.checked).toEqual(false);
  initialExpects();
};

export const testQueryBtns = ({
  queryCheckBox,
  queryLabel,
  trueBtn,
  falseBtn,
  trueQueryUrl,
  falseQueryUrl,
}) => {
  const { fullUrl } = portfolioElements({ url: true });

  const initialExpects = () => {
    expect(trueBtn).toHaveClass('normal off');
    expect(falseBtn).toHaveClass('normal off');
    expect(queryCheckBox).toHaveClass('off');
    expect(queryLabel).toHaveClass('off');
    expect(queryCheckBox.checked).toEqual(false);
    expect(fullUrl).toHaveTextContent(`${fetchBaseUrl.slice(0, -1)}`);
  };

  const trueBtnClickExpects = () => {
    expect(trueBtn).toHaveClass('active on');
    expect(falseBtn).toHaveClass('normal on');
    expect(queryCheckBox).toHaveClass('on');
    expect(queryLabel).toHaveClass('on');
    expect(queryCheckBox.checked).toEqual(true);
    expect(fullUrl).toHaveTextContent(`${fetchBaseUrl}${trueQueryUrl}`);
  };

  const falseBtnClickExpects = () => {
    expect(trueBtn).toHaveClass('normal on');
    expect(falseBtn).toHaveClass('active on');
    expect(queryCheckBox).toHaveClass('on');
    expect(queryLabel).toHaveClass('on');
    expect(queryCheckBox.checked).toEqual(true);
    expect(fullUrl).toHaveTextContent(`${fetchBaseUrl}${falseQueryUrl}`);
  };

  const testCheckBoxWithBtnsAndFullUrl = () => {
    const initialTest = () => {
      // in this test we are testing:
      //    initially the user can't check any of the checkboxes unless he provides a value
      //    (ex clicking on the commercialTrueBtn or commercialFalseBtn) then the checkbox will be
      //    checked and the user will be able to control that checkbox

      initialExpects();
      user.click(queryCheckBox);

      // nothing changes still all (checkbox, label, btns) got an off class
      initialExpects();
    };

    const afterClickingTest = ({ btn, expects }) => {
      // in this test we are testing:
      //    1- the btn already clicked so we have a queryUrl (ex, commercial=true) (commercialTrueBtn
      //       got an active class and on class (active on))
      //    2- user decided to deactivate that fieldset (uncheck the checbox) yet keeps the values but
      //       removing that query from the url (in thiscase the commercialTrueBtn will still have the
      //       active class but with the off class (active off))
      //    3- so we are testing the changing from (active on) to (active off)

      // we got a query url + checked checkbox + active on btn classes
      expects();

      // now the user capable to check /uncheck the checkbox

      // uncheck the checkbox = deactivating the fieldset, clear the url, yet the btn still active
      user.click(queryCheckBox);
      expect(queryCheckBox).toHaveClass('off');
      expect(queryLabel).toHaveClass('off');
      expect(queryCheckBox.checked).toEqual(false);
      expect(btn).toHaveClass('active off');
      expect(fullUrl).toHaveTextContent(`${fetchBaseUrl.slice(0, -1)}`);

      // check the checkbox = activating the fieldset, add back the values to the url, btn still active
      user.click(queryCheckBox);
      expects();
    };

    // no btns were clicked
    initialTest();

    // testing the checkbox with the trueBtn clicked
    user.click(trueBtn);
    afterClickingTest({ btn: trueBtn, expects: trueBtnClickExpects });

    // back to initial condition for the next test (clear everything)
    user.click(trueBtn);
    initialExpects();

    // testing the checkbox with the falseBtn clicked
    user.click(falseBtn);
    afterClickingTest({ btn: falseBtn, expects: falseBtnClickExpects });
  };

  // no btns were clicked
  initialExpects();

  // testing the trueBtn with the fullUrl & the queryCheckBox
  user.click(trueBtn);
  trueBtnClickExpects();
  user.click(trueBtn);
  initialExpects();

  // testing the falseBtn with the fullUrl & the queryCheckBox
  user.click(falseBtn);
  falseBtnClickExpects();
  user.click(falseBtn);
  initialExpects();

  // testing the trueBtn & falseBtn with the fullUrl & the queryCheckBox
  user.click(trueBtn);
  trueBtnClickExpects();
  user.click(falseBtn);
  falseBtnClickExpects();

  // back to initial condition for the next test (clear everything)
  user.click(falseBtn);
  initialExpects();

  // test the checkbox with the btns and the fullUrl
  testCheckBoxWithBtnsAndFullUrl();
};

export const testQueryBtn = ({
  queryCheckBox,
  queryLabel,
  trueBtn,
  trueQueryUrl,
}) => {
  const { fullUrl } = portfolioElements({ url: true });

  const initialExpects = () => {
    expect(trueBtn).toHaveClass('normal off');
    expect(queryCheckBox).toHaveClass('off');
    expect(queryLabel).toHaveClass('off');
    expect(queryCheckBox.checked).toEqual(false);
    expect(fullUrl).toHaveTextContent(`${fetchBaseUrl.slice(0, -1)}`);
  };

  const trueBtnClickExpects = () => {
    expect(trueBtn).toHaveClass('active on');
    expect(queryCheckBox).toHaveClass('on');
    expect(queryLabel).toHaveClass('on');
    expect(queryCheckBox.checked).toEqual(true);
    expect(fullUrl).toHaveTextContent(`${fetchBaseUrl}${trueQueryUrl}`);
  };

  initialExpects();
  user.click(queryCheckBox);

  // nothing changes
  initialExpects();

  user.click(trueBtn);
  trueBtnClickExpects();

  user.click(queryCheckBox);
  expect(queryCheckBox).toHaveClass('off');
  expect(queryLabel).toHaveClass('off');
  expect(queryCheckBox.checked).toEqual(false);
  expect(trueBtn).toHaveClass('active off');
  expect(fullUrl).toHaveTextContent(`${fetchBaseUrl.slice(0, -1)}`);

  user.click(queryCheckBox);
  trueBtnClickExpects();

  user.click(trueBtn);
  expect(trueBtn).toHaveClass('normal off');
  expect(queryCheckBox).toHaveClass('off');
  expect(queryLabel).toHaveClass('off');
  expect(queryCheckBox.checked).toEqual(false);
  expect(fullUrl).toHaveTextContent(`${fetchBaseUrl.slice(0, -1)}`);
};
