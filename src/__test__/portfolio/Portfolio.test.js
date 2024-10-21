import { within, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils';
import { controlElements } from '../helpers/createElements/controls';
import { homeElements } from '../helpers/createElements/home';
import { portfolioElements } from '../helpers/createElements/portfolio';
import { testProject } from '../helpers/testElements/testProject';
import user from '@testing-library/user-event';
import App from '../../App';

describe('App / Portfolio', () => {
  beforeEach(() => {
    renderWithProviders(<App />);

    // navigate to portfolioPage
    const { portfolioBtn } = controlElements({ portfolioBtn: true });
    user.click(portfolioBtn);
  });

  describe('Navigate', () => {
    it('should render / navigate to portfolioPage', () => {
      const { homePage } = homeElements({ homePage: true });
      const { portfolioPage } = portfolioElements({ portfolioPage: true });

      expect(homePage).not.toBeInTheDocument();
      expect(portfolioPage).toBeInTheDocument();
    });
  });

  describe('Layout', () => {
    it('should render the pageTitle & subTitle', () => {
      const { pageTitle, pageSubTitle } = portfolioElements({ titles: true });

      expect(pageTitle).toBeInTheDocument();
      expect(pageSubTitle).toBeInTheDocument();
    });

    it('should render the query buttons', () => {
      const queryBtns = portfolioElements({ queryBtns: true });

      expect(queryBtns.allProjectsBtn).toBeInTheDocument();
      expect(queryBtns.allProjectsBtn).toHaveClass('active-query');
      expect(queryBtns.mernStackBtn).toBeInTheDocument();
      expect(queryBtns.mernStackBtn).toHaveClass('query-btn');
      expect(queryBtns.reactJsBtn).toBeInTheDocument();
      expect(queryBtns.reactJsBtn).toHaveClass('query-btn');
      expect(queryBtns.javascriptBtn).toBeInTheDocument();
      expect(queryBtns.javascriptBtn).toHaveClass('query-btn');
    });

    it('should render the projects list with all the projects details', async () => {
      const { projectsList } = portfolioElements({ projectsList: true });

      expect(projectsList).toBeInTheDocument();

      // msw respond with 2 projects
      const projectsBlocks = await waitFor(() =>
        within(projectsList).getAllByRole('region', { name: 'Project' })
      );
      expect(projectsBlocks.length).toBe(2);

      // testing 1st project
      testProject({ projectsBlock: projectsBlocks[0], index: 0 });

      // testing 2nd project
      testProject({ projectsBlock: projectsBlocks[1], index: 1 });
    });
  });
});
