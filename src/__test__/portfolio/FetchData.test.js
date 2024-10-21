import {
  within,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { renderWithProviders } from '../../test-utils';
import { controlElements } from '../helpers/createElements/controls';
import { portfolioElements } from '../helpers/createElements/portfolio';
import user from '@testing-library/user-event';
import App from '../../App';

// Note:
// 1- these elements already has been tested, here we are only testing the queries
// 2- the mocked data are only 2 projects
describe('App / Fetch Form', () => {
  beforeEach(() => {
    renderWithProviders(<App />);

    // navigate to portfolio page
    const { projectBtn } = controlElements({ projectBtn: true });
    user.click(projectBtn);

    // activate fetchForm
    const { fetchFormBtn } = controlElements({ projectSubs: true });
    user.click(fetchFormBtn);
  });

  afterEach(() => {
    // close the form
    const { fetchFormBtn } = controlElements({ projectSubs: true });
    user.click(fetchFormBtn);
  });

  describe('Fetch Data', () => {
    beforeEach(() => jest.setTimeout(10000));
    describe('Fetch Form Fetch It Button & Fetch It Butto', () => {
      it('should close the form after successful fetching', async () => {
        const { fetchForm, fetchItBtn } = portfolioElements({
          fetchForm: true,
          fetchItBtn: true,
        });

        user.click(fetchItBtn);

        await waitForElementToBeRemoved(fetchForm);
      });
    });

    describe('Sort', () => {
      describe('Default Case', () => {
        it('should render the data with -createdAt (default case), if the user did not provide any sort option', async () => {
          const { fetchItBtn } = portfolioElements({
            fetchItBtn: true,
          });

          user.click(fetchItBtn);

          // testing the data
          const { projectsList } = portfolioElements({ projectsList: true });
          const projectsBlocks = await waitFor(
            () =>
              within(projectsList).getAllByRole('region', { name: 'Project' }),
            { timeout: 3000 }
          );

          // the result should be:
          // index 0: CourseTube-V4 => createdAt: '2022-09-17T03:13:46.192Z'
          // index 1: CourseTube-V3 => createdAt: '2022-09-16T03:14:05.594Z'
          const courseTubeV4 = within(projectsBlocks[0]).getByRole('heading', {
            name: 'CourseTube-V4',
          });
          const courseTubeV3 = within(projectsBlocks[1]).getByRole('heading', {
            name: 'CourseTube-V3',
          });

          expect(courseTubeV4).toBeInTheDocument();
          expect(courseTubeV3).toBeInTheDocument();
        });
      });

      describe('Project Name', () => {
        test('1st case: user did not provide + or - (default +) => ascending (v3, v4)', async () => {
          const { sortSelector, projectNameOption, fetchItBtn } =
            portfolioElements({ sortSet: true, fetchItBtn: true });

          user.selectOptions(sortSelector, projectNameOption);
          user.click(fetchItBtn);

          // testing the data
          const { projectsList } = portfolioElements({ projectsList: true });
          const projectsBlocks = await waitFor(
            () =>
              within(projectsList).getAllByRole('region', { name: 'Project' }),
            { timeout: 3000 }
          );

          // the result should be:
          // index 0: CourseTube-V3
          // index 1: CourseTube-V4
          const courseTubeV3 = within(projectsBlocks[0]).getByRole('heading', {
            name: 'CourseTube-V3',
          });
          const courseTubeV4 = within(projectsBlocks[1]).getByRole('heading', {
            name: 'CourseTube-V4',
          });

          expect(courseTubeV3).toBeInTheDocument();
          expect(courseTubeV4).toBeInTheDocument();
        });

        test('2nd case: user did type (+) => ascending (v3, v4)', async () => {
          const { sortSelector, projectNameOption, fetchItBtn } =
            portfolioElements({ sortSet: true, fetchItBtn: true });

          user.selectOptions(sortSelector, projectNameOption);

          const { optionInput } = portfolioElements({
            optionArticle: 'Project Name',
          });

          user.type(optionInput, '+');
          user.click(fetchItBtn);

          // testing the data
          const { projectsList } = portfolioElements({ projectsList: true });
          const projectsBlocks = await waitFor(
            () =>
              within(projectsList).getAllByRole('region', { name: 'Project' }),
            { timeout: 3000 }
          );

          // the result should be:
          // index 0: CourseTube-V3
          // index 1: CourseTube-V4
          const courseTubeV3 = within(projectsBlocks[0]).getByRole('heading', {
            name: 'CourseTube-V3',
          });
          const courseTubeV4 = within(projectsBlocks[1]).getByRole('heading', {
            name: 'CourseTube-V4',
          });

          expect(courseTubeV3).toBeInTheDocument();
          expect(courseTubeV4).toBeInTheDocument();
        });

        test('3rd case: user did type (-) => descending (v4, v3)', async () => {
          const { sortSelector, projectNameOption, fetchItBtn } =
            portfolioElements({ sortSet: true, fetchItBtn: true });

          user.selectOptions(sortSelector, projectNameOption);

          const { optionInput } = portfolioElements({
            optionArticle: 'Project Name',
          });

          user.type(optionInput, '-');
          user.click(fetchItBtn);

          // testing the data
          const { projectsList } = portfolioElements({ projectsList: true });
          const projectsBlocks = await waitFor(
            () =>
              within(projectsList).getAllByRole('region', { name: 'Project' }),
            { timeout: 3000 }
          );

          // the result should be:
          // index 0: CourseTube-V4
          // index 1: CourseTube-V3
          const courseTubeV4 = within(projectsBlocks[0]).getByRole('heading', {
            name: 'CourseTube-V4',
          });
          const courseTubeV3 = within(projectsBlocks[1]).getByRole('heading', {
            name: 'CourseTube-V3',
          });

          expect(courseTubeV4).toBeInTheDocument();
          expect(courseTubeV3).toBeInTheDocument();
        });
      });

      describe('Project Size', () => {
        test('1st case: user did not provide + or - (default +) => ascending (v3, v4)', async () => {
          const { sortSelector, projectSizeOption, fetchItBtn } =
            portfolioElements({ sortSet: true, fetchItBtn: true });

          user.selectOptions(sortSelector, projectSizeOption);
          user.click(fetchItBtn);

          // testing the data
          const { projectsList } = portfolioElements({ projectsList: true });
          const projectsBlocks = await waitFor(
            () =>
              within(projectsList).getAllByRole('region', { name: 'Project' }),
            { timeout: 3000 }
          );

          // the result should be:
          // index 0: CourseTube-V3 => sumCodeLines: 1000
          // index 1: CourseTube-V4 => sumCodeLines: 2000
          const courseTubeV3 = within(projectsBlocks[0]).getByRole('heading', {
            name: 'CourseTube-V3',
          });
          const courseTubeV4 = within(projectsBlocks[1]).getByRole('heading', {
            name: 'CourseTube-V4',
          });

          expect(courseTubeV3).toBeInTheDocument();
          expect(courseTubeV4).toBeInTheDocument();
        });

        test('2nd case: user did type (+) => ascending (v3, v4)', async () => {
          const { sortSelector, projectSizeOption, fetchItBtn } =
            portfolioElements({ sortSet: true, fetchItBtn: true });

          user.selectOptions(sortSelector, projectSizeOption);

          const { optionInput } = portfolioElements({
            optionArticle: 'Project Size',
          });

          user.type(optionInput, '+');
          user.click(fetchItBtn);

          // testing the data
          const { projectsList } = portfolioElements({ projectsList: true });
          const projectsBlocks = await waitFor(
            () =>
              within(projectsList).getAllByRole('region', { name: 'Project' }),
            { timeout: 3000 }
          );

          // the result should be:
          // index 0: CourseTube-V3 => sumCodeLines: 1000
          // index 1: CourseTube-V4 => sumCodeLines: 2000
          const courseTubeV3 = within(projectsBlocks[0]).getByRole('heading', {
            name: 'CourseTube-V3',
          });
          const courseTubeV4 = within(projectsBlocks[1]).getByRole('heading', {
            name: 'CourseTube-V4',
          });

          expect(courseTubeV3).toBeInTheDocument();
          expect(courseTubeV4).toBeInTheDocument();
        });

        test('3rd case: user did type (-) descending (v4, v3)', async () => {
          const { sortSelector, projectSizeOption, fetchItBtn } =
            portfolioElements({ sortSet: true, fetchItBtn: true });

          user.selectOptions(sortSelector, projectSizeOption);

          const { optionInput } = portfolioElements({
            optionArticle: 'Project Size',
          });

          user.type(optionInput, '-');
          user.click(fetchItBtn);

          // testing the data
          const { projectsList } = portfolioElements({ projectsList: true });
          const projectsBlocks = await waitFor(
            () =>
              within(projectsList).getAllByRole('region', { name: 'Project' }),
            { timeout: 3000 }
          );

          // the result should be:
          // index 0: CourseTube-V4 => sumCodeLines: 2000
          // index 1: CourseTube-V3 => sumCodeLines: 1000
          const courseTubeV4 = within(projectsBlocks[0]).getByRole('heading', {
            name: 'CourseTube-V4',
          });
          const courseTubeV3 = within(projectsBlocks[1]).getByRole('heading', {
            name: 'CourseTube-V3',
          });

          expect(courseTubeV4).toBeInTheDocument();
          expect(courseTubeV3).toBeInTheDocument();
        });
      });

      describe('Rating', () => {
        test('1st case: user did not provide + or - (default +) => ascending (v3, v4)', async () => {
          const { sortSelector, ratingOption, fetchItBtn } = portfolioElements({
            sortSet: true,
            fetchItBtn: true,
          });

          user.selectOptions(sortSelector, ratingOption);
          user.click(fetchItBtn);

          // testing the data
          const { projectsList } = portfolioElements({ projectsList: true });
          const projectsBlocks = await waitFor(
            () =>
              within(projectsList).getAllByRole('region', { name: 'Project' }),
            { timeout: 3000 }
          );

          // the result should be:
          // index 0: CourseTube-V3 => rating: 3.5
          // index 1: CourseTube-V4 => rating: 4.2
          const courseTubeV3 = within(projectsBlocks[0]).getByRole('heading', {
            name: 'CourseTube-V3',
          });
          const courseTubeV4 = within(projectsBlocks[1]).getByRole('heading', {
            name: 'CourseTube-V4',
          });

          expect(courseTubeV3).toBeInTheDocument();
          expect(courseTubeV4).toBeInTheDocument();
        });

        test('2nd case: user did type (+) => ascending (v3, v4)', async () => {
          const { sortSelector, ratingOption, fetchItBtn } = portfolioElements({
            sortSet: true,
            fetchItBtn: true,
          });

          user.selectOptions(sortSelector, ratingOption);

          const { optionInput } = portfolioElements({
            optionArticle: 'Rating',
          });

          user.type(optionInput, '+');
          user.click(fetchItBtn);

          // testing the data
          const { projectsList } = portfolioElements({ projectsList: true });
          const projectsBlocks = await waitFor(
            () =>
              within(projectsList).getAllByRole('region', { name: 'Project' }),
            { timeout: 3000 }
          );

          // the result should be:
          // index 0: CourseTube-V3 => rating: 3.5
          // index 1: CourseTube-V4 => rating: 4.2
          const courseTubeV3 = within(projectsBlocks[0]).getByRole('heading', {
            name: 'CourseTube-V3',
          });
          const courseTubeV4 = within(projectsBlocks[1]).getByRole('heading', {
            name: 'CourseTube-V4',
          });

          expect(courseTubeV3).toBeInTheDocument();
          expect(courseTubeV4).toBeInTheDocument();
        });

        test('3rd case: user did type (-) descending (v4, v3)', async () => {
          const { sortSelector, ratingOption, fetchItBtn } = portfolioElements({
            sortSet: true,
            fetchItBtn: true,
          });

          user.selectOptions(sortSelector, ratingOption);

          const { optionInput } = portfolioElements({
            optionArticle: 'Rating',
          });

          user.type(optionInput, '-');
          user.click(fetchItBtn);

          // testing the data
          const { projectsList } = portfolioElements({ projectsList: true });
          const projectsBlocks = await waitFor(
            () =>
              within(projectsList).getAllByRole('region', { name: 'Project' }),
            { timeout: 3000 }
          );

          // the result should be:
          // index 0: CourseTube-V4 => rating: 4.2
          // index 1: CourseTube-V3 => rating: 3.5
          const courseTubeV4 = within(projectsBlocks[0]).getByRole('heading', {
            name: 'CourseTube-V4',
          });
          const courseTubeV3 = within(projectsBlocks[1]).getByRole('heading', {
            name: 'CourseTube-V3',
          });

          expect(courseTubeV4).toBeInTheDocument();
          expect(courseTubeV3).toBeInTheDocument();
        });
      });

      describe('Created At', () => {
        test('1st case: user did not provide + or - (default +) => ascending (v3, v4)', async () => {
          const { sortSelector, createdAtOption, fetchItBtn } =
            portfolioElements({
              sortSet: true,
              fetchItBtn: true,
            });

          user.selectOptions(sortSelector, createdAtOption);
          user.click(fetchItBtn);

          // testing the data
          const { projectsList } = portfolioElements({ projectsList: true });
          const projectsBlocks = await waitFor(
            () =>
              within(projectsList).getAllByRole('region', { name: 'Project' }),
            { timeout: 3000 }
          );

          // the result should be:
          // index 0: CourseTube-V3 => createdAt: '2022-09-16T03:14:05.594Z'
          // index 1: CourseTube-V4 => createdAt: '2022-09-17T03:13:46.192Z'
          const courseTubeV3 = within(projectsBlocks[0]).getByRole('heading', {
            name: 'CourseTube-V3',
          });
          const courseTubeV4 = within(projectsBlocks[1]).getByRole('heading', {
            name: 'CourseTube-V4',
          });

          expect(courseTubeV3).toBeInTheDocument();
          expect(courseTubeV4).toBeInTheDocument();
        });

        test('2nd case: user did type (+) => ascending (v3, v4)', async () => {
          const { sortSelector, createdAtOption, fetchItBtn } =
            portfolioElements({
              sortSet: true,
              fetchItBtn: true,
            });

          user.selectOptions(sortSelector, createdAtOption);

          const { optionInput } = portfolioElements({
            optionArticle: 'Created At',
          });

          user.type(optionInput, '+');
          user.click(fetchItBtn);

          // testing the data
          const { projectsList } = portfolioElements({ projectsList: true });
          const projectsBlocks = await waitFor(
            () =>
              within(projectsList).getAllByRole('region', { name: 'Project' }),
            { timeout: 3000 }
          );

          // the result should be:
          // index 0: CourseTube-V3 => createdAt: '2022-09-16T03:14:05.594Z'
          // index 1: CourseTube-V4 => createdAt: '2022-09-17T03:13:46.192Z'
          const courseTubeV3 = within(projectsBlocks[0]).getByRole('heading', {
            name: 'CourseTube-V3',
          });
          const courseTubeV4 = within(projectsBlocks[1]).getByRole('heading', {
            name: 'CourseTube-V4',
          });

          expect(courseTubeV3).toBeInTheDocument();
          expect(courseTubeV4).toBeInTheDocument();
        });

        test('3rd case: user did type (-) descending (v4, v3)', async () => {
          const { sortSelector, createdAtOption, fetchItBtn } =
            portfolioElements({
              sortSet: true,
              fetchItBtn: true,
            });

          user.selectOptions(sortSelector, createdAtOption);

          const { optionInput } = portfolioElements({
            optionArticle: 'Created At',
          });

          user.type(optionInput, '-');
          user.click(fetchItBtn);

          // testing the data
          const { projectsList } = portfolioElements({ projectsList: true });
          const projectsBlocks = await waitFor(
            () =>
              within(projectsList).getAllByRole('region', { name: 'Project' }),
            { timeout: 3000 }
          );

          // the result should be:
          // index 0: CourseTube-V4 => createdAt: '2022-09-17T03:13:46.192Z'
          // index 1: CourseTube-V3 => createdAt: '2022-09-16T03:14:05.594Z'
          const courseTubeV4 = within(projectsBlocks[0]).getByRole('heading', {
            name: 'CourseTube-V4',
          });
          const courseTubeV3 = within(projectsBlocks[1]).getByRole('heading', {
            name: 'CourseTube-V3',
          });

          expect(courseTubeV4).toBeInTheDocument();
          expect(courseTubeV3).toBeInTheDocument();
        });
      });

      describe('Duration', () => {
        test('1st case: user did not provide + or - (default +) => ascending (v3, v4)', async () => {
          const { sortSelector, durationOption, fetchItBtn } =
            portfolioElements({
              sortSet: true,
              fetchItBtn: true,
            });

          user.selectOptions(sortSelector, durationOption);
          user.click(fetchItBtn);

          // testing the data
          const { projectsList } = portfolioElements({ projectsList: true });
          const projectsBlocks = await waitFor(
            () =>
              within(projectsList).getAllByRole('region', { name: 'Project' }),
            { timeout: 3000 }
          );

          // the result should be:
          // index 0: CourseTube-V3 => duration: 8
          // index 1: CourseTube-V4 => duration: 22
          const courseTubeV3 = within(projectsBlocks[0]).getByRole('heading', {
            name: 'CourseTube-V3',
          });
          const courseTubeV4 = within(projectsBlocks[1]).getByRole('heading', {
            name: 'CourseTube-V4',
          });

          expect(courseTubeV3).toBeInTheDocument();
          expect(courseTubeV4).toBeInTheDocument();
        });

        test('2nd case: user did type (+) => ascending (v3, v4)', async () => {
          const { sortSelector, durationOption, fetchItBtn } =
            portfolioElements({
              sortSet: true,
              fetchItBtn: true,
            });

          user.selectOptions(sortSelector, durationOption);

          const { optionInput } = portfolioElements({
            optionArticle: 'Duration',
          });

          user.type(optionInput, '+');
          user.click(fetchItBtn);

          // testing the data
          const { projectsList } = portfolioElements({ projectsList: true });
          const projectsBlocks = await waitFor(
            () =>
              within(projectsList).getAllByRole('region', { name: 'Project' }),
            { timeout: 3000 }
          );

          // the result should be:
          // index 0: CourseTube-V3 => duration: 8
          // index 1: CourseTube-V4 => duration: 22
          const courseTubeV3 = within(projectsBlocks[0]).getByRole('heading', {
            name: 'CourseTube-V3',
          });
          const courseTubeV4 = within(projectsBlocks[1]).getByRole('heading', {
            name: 'CourseTube-V4',
          });

          expect(courseTubeV3).toBeInTheDocument();
          expect(courseTubeV4).toBeInTheDocument();
        });

        test('3rd case: user did type (-) descending (v4, v3)', async () => {
          const { sortSelector, durationOption, fetchItBtn } =
            portfolioElements({
              sortSet: true,
              fetchItBtn: true,
            });

          user.selectOptions(sortSelector, durationOption);

          const { optionInput } = portfolioElements({
            optionArticle: 'Duration',
          });

          user.type(optionInput, '-');
          user.click(fetchItBtn);

          // testing the data
          const { projectsList } = portfolioElements({ projectsList: true });
          const projectsBlocks = await waitFor(
            () =>
              within(projectsList).getAllByRole('region', { name: 'Project' }),
            { timeout: 3000 }
          );

          // the result should be:
          // index 0: CourseTube-V4 => duration: 22
          // index 1: CourseTube-V3 => duration: 8
          const courseTubeV4 = within(projectsBlocks[0]).getByRole('heading', {
            name: 'CourseTube-V4',
          });
          const courseTubeV3 = within(projectsBlocks[1]).getByRole('heading', {
            name: 'CourseTube-V3',
          });

          expect(courseTubeV4).toBeInTheDocument();
          expect(courseTubeV3).toBeInTheDocument();
        });
      });
    });

    describe('Project Name & Version', () => {
      describe('CourseTube', () => {
        it('should render all the projects that matches the user input', async () => {
          const { projectNameInput, fetchItBtn } = portfolioElements({
            projectNameSet: true,
            fetchItBtn: true,
          });

          user.type(projectNameInput, 'CourseTube');
          user.click(fetchItBtn);

          // testing the data
          const { projectsList } = portfolioElements({ projectsList: true });
          const projectsBlocks = await waitFor(
            () =>
              within(projectsList).getAllByRole('region', { name: 'Project' }),
            { timeout: 3000 }
          );

          // the result should be:
          // index 0: CourseTube-V4
          // index 1: CourseTube-V3
          const courseTubeV4 = within(projectsBlocks[0]).getByRole('heading', {
            name: 'CourseTube-V4',
          });
          const courseTubeV3 = within(projectsBlocks[1]).getByRole('heading', {
            name: 'CourseTube-V3',
          });

          expect(courseTubeV4).toBeInTheDocument();
          expect(courseTubeV3).toBeInTheDocument();
        });
      });

      describe('CourseTube V3', () => {
        it('should render the project & the specific that matches the user inputs', async () => {
          const { projectNameInput, versionInput, fetchItBtn } =
            portfolioElements({
              projectNameSet: true,
              versionSet: true,
              fetchItBtn: true,
            });

          user.type(projectNameInput, 'CourseTube');
          user.type(versionInput, 'v3');
          user.click(fetchItBtn);

          // testing the data
          const { projectsList } = portfolioElements({ projectsList: true });
          const projectsBlocks = await waitFor(
            () =>
              within(projectsList).getAllByRole('region', { name: 'Project' }),
            { timeout: 3000 }
          );

          // the result should be:
          // index 0: CourseTube-V3
          expect(projectsBlocks.length).toBe(1);

          const courseTubeV3 = within(projectsBlocks[0]).getByRole('heading', {
            name: 'CourseTube-V3',
          });

          expect(courseTubeV3).toBeInTheDocument();
        });
      });

      describe('CourseTube V4', () => {
        it('should render the project & the specific that matches the user inputs', async () => {
          const { projectNameInput, versionInput, fetchItBtn } =
            portfolioElements({
              projectNameSet: true,
              versionSet: true,
              fetchItBtn: true,
            });

          user.type(projectNameInput, 'CourseTube');
          user.type(versionInput, 'v4');
          user.click(fetchItBtn);

          // testing the data
          const { projectsList } = portfolioElements({ projectsList: true });
          const projectsBlocks = await waitFor(
            () =>
              within(projectsList).getAllByRole('region', { name: 'Project' }),
            { timeout: 3000 }
          );

          // the result should be:
          // index 0: CourseTube-V4
          expect(projectsBlocks.length).toBe(1);

          const courseTubeV4 = within(projectsBlocks[0]).getByRole('heading', {
            name: 'CourseTube-V4',
          });

          expect(courseTubeV4).toBeInTheDocument();
        });
      });
    });

    describe('Rating', () => {
      test('rating >= 3.5', async () => {
        const { gteInput, fetchItBtn } = portfolioElements({
          ratingSet: true,
          fetchItBtn: true,
        });

        user.type(gteInput, '3.5');
        user.click(fetchItBtn);

        // testing the data
        const { projectsList } = portfolioElements({ projectsList: true });
        const projectsBlocks = await waitFor(
          () =>
            within(projectsList).getAllByRole('region', { name: 'Project' }),
          { timeout: 3000 }
        );

        // the result should be:
        // index 0: CourseTube-V4 => rating: 4.2
        // index 1: CourseTube-V3 => rating: 3.5
        const courseTubeV4 = within(projectsBlocks[0]).getByRole('heading', {
          name: 'CourseTube-V4',
        });
        const courseTubeV3 = within(projectsBlocks[1]).getByRole('heading', {
          name: 'CourseTube-V3',
        });

        expect(courseTubeV4).toBeInTheDocument();
        expect(courseTubeV3).toBeInTheDocument();
      });
    });

    describe('Commercial', () => {
      it('should render the projects which has commercial = true, if the user clicked on commercialTrueBtn', async () => {
        const { commercialTrueBtn, fetchItBtn } = portfolioElements({
          commercialSet: true,
          fetchItBtn: true,
        });

        user.click(commercialTrueBtn);
        user.click(fetchItBtn);

        // testing the data
        const { projectsList } = portfolioElements({ projectsList: true });
        const projectsBlocks = await waitFor(
          () =>
            within(projectsList).getAllByRole('region', { name: 'Project' }),
          { timeout: 3000 }
        );

        // the result should be:
        // index 0: CourseTube-V4
        expect(projectsBlocks.length).toBe(1);

        const courseTubeV4 = within(projectsBlocks[0]).getByRole('heading', {
          name: 'CourseTube-V4',
        });

        expect(courseTubeV4).toBeInTheDocument();
      });

      it('should render the projects which has commercial = false, if the user clicked on commercialFalseBtn', async () => {
        const { commercialFalseBtn, fetchItBtn } = portfolioElements({
          commercialSet: true,
          fetchItBtn: true,
        });

        user.click(commercialFalseBtn);
        user.click(fetchItBtn);

        // testing the data
        const { projectsList } = portfolioElements({ projectsList: true });
        const projectsBlocks = await waitFor(
          () =>
            within(projectsList).getAllByRole('region', { name: 'Project' }),
          { timeout: 3000 }
        );

        // the result should be:
        // index 0: CourseTube-V3
        expect(projectsBlocks.length).toBe(1);

        const courseTubeV3 = within(projectsBlocks[0]).getByRole('heading', {
          name: 'CourseTube-V3',
        });

        expect(courseTubeV3).toBeInTheDocument();
      });
    });

    describe('Responsive', () => {
      it('should render the projects which has responsive = true, if the user clicked on responsiveTrueBtn', async () => {
        const { responsiveTrueBtn, fetchItBtn } = portfolioElements({
          responsiveSet: true,
          fetchItBtn: true,
        });

        user.click(responsiveTrueBtn);
        user.click(fetchItBtn);

        // testing the data
        const { projectsList } = portfolioElements({ projectsList: true });
        const projectsBlocks = await waitFor(
          () =>
            within(projectsList).getAllByRole('region', { name: 'Project' }),
          { timeout: 3000 }
        );

        // the result should be:
        // index 0: CourseTube-V4
        expect(projectsBlocks.length).toBe(1);

        const courseTubeV4 = within(projectsBlocks[0]).getByRole('heading', {
          name: 'CourseTube-V4',
        });

        expect(courseTubeV4).toBeInTheDocument();
      });

      it('should render the projects which has responsive = false, if the user clicked on responsiveFalseBtn', async () => {
        const { responsiveFalseBtn, fetchItBtn } = portfolioElements({
          responsiveSet: true,
          fetchItBtn: true,
        });

        user.click(responsiveFalseBtn);
        user.click(fetchItBtn);

        // testing the data
        const { projectsList } = portfolioElements({ projectsList: true });
        const projectsBlocks = await waitFor(
          () =>
            within(projectsList).getAllByRole('region', { name: 'Project' }),
          { timeout: 3000 }
        );

        // the result should be:
        // index 0: CourseTube-V3
        expect(projectsBlocks.length).toBe(1);

        const courseTubeV3 = within(projectsBlocks[0]).getByRole('heading', {
          name: 'CourseTube-V3',
        });

        expect(courseTubeV3).toBeInTheDocument();
      });
    });

    describe('Front-End', () => {
      it('should render the projects which has ui = true, if the user clicked on frontEndTrueBtn', async () => {
        const { frontEndTrueBtn, fetchItBtn } = portfolioElements({
          frontEndSet: true,
          fetchItBtn: true,
        });

        user.click(frontEndTrueBtn);
        user.click(fetchItBtn);

        // testing the data
        const { projectsList } = portfolioElements({ projectsList: true });
        const projectsBlocks = await waitFor(
          () =>
            within(projectsList).getAllByRole('region', { name: 'Project' }),
          { timeout: 3000 }
        );

        // the result should be:
        // index 0: CourseTube-V3
        expect(projectsBlocks.length).toBe(1);

        const courseTubeV3 = within(projectsBlocks[0]).getByRole('heading', {
          name: 'CourseTube-V3',
        });

        expect(courseTubeV3).toBeInTheDocument();
      });
    });

    describe('Full Stack', () => {
      it('should render the projects which has ui = true && server = true, if the user clicked on frontEndTrueBtn', async () => {
        const { fullStackTrueBtn, fetchItBtn } = portfolioElements({
          fullStackSet: true,
          fetchItBtn: true,
        });

        user.click(fullStackTrueBtn);
        user.click(fetchItBtn);

        // testing the data
        const { projectsList } = portfolioElements({ projectsList: true });
        const projectsBlocks = await waitFor(
          () =>
            within(projectsList).getAllByRole('region', { name: 'Project' }),
          { timeout: 3000 }
        );

        // the result should be:
        // index 0: CourseTube-V4
        expect(projectsBlocks.length).toBe(1);

        const courseTubeV4 = within(projectsBlocks[0]).getByRole('heading', {
          name: 'CourseTube-V4',
        });

        expect(courseTubeV4).toBeInTheDocument();
      });
    });

    describe('Tested With', () => {
      it('should render the projects which has been tested with chrome & safari, if the user clicked on frontEndTrueBtn', async () => {
        const { chromeCheckBox, safariCheckBox, fetchItBtn } =
          portfolioElements({
            testedWithSet: true,
            fetchItBtn: true,
          });

        user.click(chromeCheckBox);
        user.click(safariCheckBox);
        user.click(fetchItBtn);

        // testing the data
        const { projectsList } = portfolioElements({ projectsList: true });
        const projectsBlocks = await waitFor(
          () =>
            within(projectsList).getAllByRole('region', { name: 'Project' }),
          { timeout: 3000 }
        );

        // the result should be:
        // index 0: CourseTube-V4
        expect(projectsBlocks.length).toBe(1);

        const courseTubeV4 = within(projectsBlocks[0]).getByRole('heading', {
          name: 'CourseTube-V4',
        });

        expect(courseTubeV4).toBeInTheDocument();
      });
    });
  });
});
