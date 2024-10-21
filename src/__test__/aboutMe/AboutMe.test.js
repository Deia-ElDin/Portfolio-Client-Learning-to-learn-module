import { within, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils';
import { controlElements } from '../helpers/createElements/controls';
import { homeElements } from '../helpers/createElements/home';
import { aboutMeElements } from '../helpers/createElements/aboutMe';
import { handleExperience } from '../../features/helpers/functions/handleAboutMe';
import { testSkill } from '../helpers/testElements/testSkill';
import { testJob } from '../helpers/testElements/testJob';
import {
  expSvg,
  clientsSvg,
  projectsSvg,
} from '../../features/helpers/srcs/handleImgsSrc';
import user from '@testing-library/user-event';
import App from '../../App';

describe('App / AboutMe', () => {
  beforeEach(() => {
    renderWithProviders(<App />);

    // navigate to aboutMePage
    const { aboutMeBtn } = controlElements({ aboutMeBtn: true });
    user.click(aboutMeBtn);
  });

  describe('Navigate', () => {
    it('should render / navigate to aboutMePage', () => {
      const { homePage } = homeElements({ homePage: true });
      const { aboutMePage } = aboutMeElements({ aboutMePage: true });

      expect(homePage).not.toBeInTheDocument();
      expect(aboutMePage).toBeInTheDocument();
    });
  });

  describe('Layout', () => {
    it('should render the pageTitle & subTitle', () => {
      const { pageTitle, pageSubTitle } = aboutMeElements({ titles: true });

      expect(pageTitle).toBeInTheDocument();
      expect(pageSubTitle).toBeInTheDocument();
    });

    it('should render the infos with all the elements included', async () => {
      const infos = aboutMeElements({ infos: true });
      const experience = handleExperience();

      expect(infos.infosSec).toBeInTheDocument();

      // left infos
      expect(infos.firstParagraph).toBeInTheDocument();
      expect(infos.secondParagraph).toBeInTheDocument();

      // right infos
      expect(infos.infoBlock.length).toBe(3);

      expect(infos.expImg).toBeInTheDocument();
      expect(infos.expImg).toHaveAttribute('src', expSvg);
      expect(infos.expTitle).toBeInTheDocument();
      const expText = within(infos.infoBlock[0]).getByText(experience);
      expect(expText).toBeInTheDocument();

      // msw respond with 2 projects, one of them => commercial = true;
      expect(infos.clientsImg).toBeInTheDocument();
      expect(infos.clientsImg).toHaveAttribute('src', clientsSvg);
      expect(infos.clientsTitle).toBeInTheDocument();
      const clients = await waitFor(() =>
        within(infos.infoBlock[1]).getByText('1')
      );
      expect(clients).toBeInTheDocument();

      expect(infos.projectsImg).toBeInTheDocument();
      expect(infos.projectsImg).toHaveAttribute('src', projectsSvg);
      expect(infos.projectsTitle).toBeInTheDocument();
      const projects = await waitFor(() =>
        within(infos.infoBlock[2]).getByText('2')
      );
      expect(projects).toBeInTheDocument();
    });

    it('should render the skills with all the elements included', async () => {
      const skills = aboutMeElements({ skills: true });

      expect(skills.skillsSec).toBeInTheDocument();
      expect(skills.skillsTitle).toBeInTheDocument();
      expect(skills.skillsList).toBeInTheDocument();

      // msw respond with 2 skills
      const skillBlocks = await waitFor(() =>
        within(skills.skillsList).getAllByRole('region')
      );
      expect(skillBlocks.length).toBe(2);

      // testing 1st skill
      testSkill({ skillBlock: skillBlocks[0], index: 0 });

      // testing 2st skill
      testSkill({ skillBlock: skillBlocks[1], index: 1 });

      const editBtn = within(skills.skillsList).getAllByRole('button', {
        name: /edit button/i,
      });
      expect(editBtn.length).toBe(2);

      user.click(editBtn[0]);

      const form = aboutMeElements({ skillForm: true, skillFormBtns: true });
      expect(form.skillForm).toBeInTheDocument();
      expect(form.createBtn).not.toBeInTheDocument();
      expect(form.updateBtn).toBeInTheDocument();
      expect(form.deleteBtn).toBeInTheDocument();
    });

    it('should render the jobs with all the elements included', async () => {
      const jobs = aboutMeElements({ jobs: true });

      expect(jobs.jobsSec).toBeInTheDocument();
      expect(jobs.jobsTitle).toBeInTheDocument();
      expect(jobs.jobsList).toBeInTheDocument();

      // msw respond with 2 jobs
      const jobBlocks = await waitFor(() =>
        within(jobs.jobsList).getAllByRole('region')
      );
      expect(jobBlocks.length).toBe(2);

      // testing 1st job
      testJob({ jobBlock: jobBlocks[0], index: 0 });

      // testing 2st job
      testJob({ jobBlock: jobBlocks[1], index: 1 });

      const editBtns = within(jobs.jobsList).getAllByRole('button', {
        name: /edit button/i,
      });
      expect(editBtns.length).toBe(2);

      user.click(editBtns[0]);

      const form = aboutMeElements({ jobForm: true, jobFormBtns: true });
      expect(form.jobForm).toBeInTheDocument();
      expect(form.createBtn).not.toBeInTheDocument();
      expect(form.updateBtn).toBeInTheDocument();
      expect(form.deleteBtn).toBeInTheDocument();
    });
  });
});
