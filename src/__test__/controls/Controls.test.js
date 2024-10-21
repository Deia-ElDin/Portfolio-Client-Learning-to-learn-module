import { renderWithProviders } from '../../test-utils';
import { controlElements } from '../helpers/createElements/controls';
import { homeElements } from '../helpers/createElements/home';
import { aboutMeElements } from '../helpers/createElements/aboutMe';
import { portfolioElements } from '../helpers/createElements/portfolio';
import { contactMeElements } from '../helpers/createElements/contactMe';
import { testMainAndSecondariesBtns } from '../helpers/testElements/testBtnsList';
import user from '@testing-library/user-event';
import App from '../../App';

describe('Controls', () => {
  beforeEach(() => renderWithProviders(<App />));

  describe('Initial Render', () => {
    describe('Sections', () => {
      it('should render the control sections', () => {
        const { controls, mainControls, secondaryControls } = controlElements({
          controls: true,
          mainControls: true,
          secondaryControls: true,
        });

        expect(controls).toBeInTheDocument();
        expect(mainControls).toBeInTheDocument();
        expect(mainControls).toHaveClass('controls-main');
        expect(secondaryControls).toBeInTheDocument();
        expect(secondaryControls).toHaveClass('controls-secondary');
      });
    });

    describe('Control btns', () => {
      it('it should render the controls btns', () => {
        const btns = controlElements({ getAllBtns: true });

        expect(btns.loginBtn).toBeInTheDocument();
        expect(btns.logoutBtn).toBeInTheDocument();

        expect(btns.homeBtn).toBeInTheDocument();
        expect(btns.profileBtn).toBeInTheDocument();

        expect(btns.aboutMeBtn).toBeInTheDocument();
        expect(btns.detailsBtn).toBeInTheDocument();
        expect(btns.skillFormBtn).not.toBeInTheDocument();
        expect(btns.jobFormBtn).not.toBeInTheDocument();

        expect(btns.portfolioBtn).toBeInTheDocument();
        expect(btns.projectBtn).toBeInTheDocument();
        expect(btns.projectFormBtn).not.toBeInTheDocument();
        expect(btns.fetchFormBtn).not.toBeInTheDocument();

        expect(btns.contactMeBtn).toBeInTheDocument();
        expect(btns.contactsBtn).toBeInTheDocument();
        expect(btns.contactFormBtn).not.toBeInTheDocument();
        expect(btns.mediaFormBtn).not.toBeInTheDocument();
      });
    });
  });

  describe('Classes & Sections', () => {
    // Note: testing the classes is very important because it provides a visual indication for the user
    // check features/helpers/functions/handleControls.js
    // Note: it's important to test the sections because it's where the buttons rendered on the screen, either on the controls-main section which is visible or controls-secondary section which is hidden
    // check sass/_controls.scss
    describe('Initial Render', () => {
      it('initially should render the correct classes, and the btns should be in the correct section', () => {
        // initially only homeBtn should have an active-btn class
        // logoutBtn should have a disable-logout because the user needs to login first
        // incase the user logged in, the loginBtn will have an active-login but the cursor: not-allowed, it gives an indication that the user already logged in but he can't click the loginBtn, and the logoutBtn will have a control-btn class (able to click), if clicked => active-btn class
        const btns = controlElements({ getAllBtns: true });

        expect(btns.loginBtn).toHaveClass('control-btn');
        expect(btns.logoutBtn).toHaveClass('disable-logout');

        expect(btns.homeBtn).toHaveClass('active-btn');
        expect(btns.profileBtn).toHaveClass('control-btn');

        expect(btns.aboutMeBtn).toHaveClass('control-btn');
        expect(btns.detailsBtn).toHaveClass('multi-btn');

        expect(btns.portfolioBtn).toHaveClass('control-btn');
        expect(btns.projectBtn).toHaveClass('multi-btn');

        expect(btns.contactMeBtn).toHaveClass('control-btn');
        expect(btns.contactsBtn).toHaveClass('multi-btn');

        testMainAndSecondariesBtns();
      });
    });

    describe('loginBtn', () => {
      beforeEach(() => {
        const { loginBtn } = controlElements({ loginBtn: true });
        user.click(loginBtn);
      });

      it('should reassign the classes after clicking loginBtn', () => {
        const { loginBtn, homeBtn } = controlElements({
          loginBtn: true,
          homeBtn: true,
        });

        expect(loginBtn).toHaveClass('active-login');
        expect(homeBtn).toHaveClass('active-btn');
      });

      it('should render the correct mainBtnsList & secondaryBtnsList', () => {
        // if the btn were already exist in the inital mainBtnsList, then the list won't change
        // check features/helpers/function/handleInitialState => mainBtnsInitialState
        // this function responsible for testing at which list the btn exist
        // depending on the list the Controls will re render
        // check features/controls/Controls
        // if we didn't provide any arguments it will take the initial Lists to loop over
        testMainAndSecondariesBtns();
      });
    });

    describe('profileBtn', () => {
      beforeEach(() => {
        const { profileBtn } = controlElements({ profileBtn: true });
        user.click(profileBtn);
      });

      it('should reassign the classes after clicking profileBtn', () => {
        const { homeBtn, profileBtn } = controlElements({
          homeBtn: true,
          profileBtn: true,
        });

        expect(homeBtn).toHaveClass('control-btn');
        expect(profileBtn).toHaveClass('active-btn');
      });

      it('should render the correct mainBtnsList & secondaryBtnsList', () => {
        const mainBtnsList = [
          'Login',
          'Profile',
          'About Me',
          'Portfolio',
          'Contact Me',
        ];
        const secondaryBtnsList = [
          'Logout',
          'Home',
          'Details',
          'Project',
          'Contacts',
        ];

        testMainAndSecondariesBtns(mainBtnsList, secondaryBtnsList);
      });
    });

    describe('aboutMeBtn', () => {
      beforeEach(() => {
        const { aboutMeBtn } = controlElements({ aboutMeBtn: true });
        user.click(aboutMeBtn);
      });

      it('should reassign the classes after clicking aboutMeBtn', () => {
        const { homeBtn, aboutMeBtn } = controlElements({
          homeBtn: true,
          aboutMeBtn: true,
        });

        expect(homeBtn).toHaveClass('control-btn');
        expect(aboutMeBtn).toHaveClass('active-btn');
      });

      it('should render the correct mainBtnsList & secondaryBtnsList', () => {
        testMainAndSecondariesBtns();
      });
    });

    describe('detailsBtn', () => {
      beforeEach(() => {
        const { detailsBtn } = controlElements({ detailsBtn: true });
        user.click(detailsBtn);
      });

      it('should reassign the classes after clicking detailsBtn', () => {
        const { homeBtn, detailsBtn } = controlElements({
          homeBtn: true,
          detailsBtn: true,
        });

        expect(homeBtn).toHaveClass('control-btn');
        expect(detailsBtn).toHaveClass('active-multi-btn');
      });

      it('should render the subBtns once the user clicks on detailsBtn & clicking on detailsBtn should toggle the appearance of these 2 buttons', () => {
        const subs1 = controlElements({ detailsSubs: true });
        expect(subs1.skillFormBtn).toBeInTheDocument();
        expect(subs1.jobFormBtn).toBeInTheDocument();

        const { detailsBtn } = controlElements({ detailsBtn: true });
        user.click(detailsBtn);

        const subs2 = controlElements({ detailsSubs: true });
        expect(subs2.skillFormBtn).not.toBeInTheDocument();
        expect(subs2.jobFormBtn).not.toBeInTheDocument();
      });

      it('should render the correct mainBtnsList & secondaryBtnsList', () => {
        const mainBtnsList = [
          'Login',
          'Home',
          'Details',
          'Portfolio',
          'Contact Me',
        ];
        const secondaryBtnsList = [
          'Logout',
          'Profile',
          'About Me',
          'Project',
          'Contacts',
        ];

        testMainAndSecondariesBtns(mainBtnsList, secondaryBtnsList);
      });
    });

    describe('portfolioBtn', () => {
      beforeEach(() => {
        const { portfolioBtn } = controlElements({ portfolioBtn: true });
        user.click(portfolioBtn);
      });

      it('should reassign the classes after clicking portfolioBtn', () => {
        const { homeBtn, portfolioBtn } = controlElements({
          homeBtn: true,
          portfolioBtn: true,
        });

        expect(homeBtn).toHaveClass('control-btn');
        expect(portfolioBtn).toHaveClass('active-btn');
      });

      it('should render the correct mainBtnsList & secondaryBtnsList', () => {
        testMainAndSecondariesBtns();
      });
    });

    describe('projectBtn', () => {
      beforeEach(() => {
        const { projectBtn } = controlElements({ projectBtn: true });
        user.click(projectBtn);
      });

      it('should reassign the classes after clicking projectBtn', () => {
        const { homeBtn, projectBtn } = controlElements({
          homeBtn: true,
          projectBtn: true,
        });

        expect(homeBtn).toHaveClass('control-btn');
        expect(projectBtn).toHaveClass('active-multi-btn');
      });

      it('should render the subBtns once the user clicks on projectBtn & clicking on projectBtn should toggle the appearance of these 2 buttons', () => {
        const subs1 = controlElements({ projectSubs: true });
        expect(subs1.projectFormBtn).toBeInTheDocument();
        expect(subs1.fetchFormBtn).toBeInTheDocument();

        const { projectBtn } = controlElements({ projectBtn: true });
        user.click(projectBtn);

        const subs2 = controlElements({ projectSubs: true });
        expect(subs2.projectFormBtn).not.toBeInTheDocument();
        expect(subs2.fetchFormBtn).not.toBeInTheDocument();
      });

      it('should render the correct mainBtnsList & secondaryBtnsList', () => {
        const mainBtnsList = [
          'Login',
          'Home',
          'About Me',
          'Project',
          'Contact Me',
        ];
        const secondaryBtnsList = [
          'Logout',
          'Profile',
          'Details',
          'Portfolio',
          'Contacts',
        ];

        testMainAndSecondariesBtns(mainBtnsList, secondaryBtnsList);
      });
    });

    describe('contactMeBtn', () => {
      beforeEach(() => {
        const { contactMeBtn } = controlElements({ contactMeBtn: true });
        user.click(contactMeBtn);
      });

      it('should reassign the classes after clicking contactMeBtn', () => {
        const { homeBtn, contactMeBtn } = controlElements({
          homeBtn: true,
          contactMeBtn: true,
        });

        expect(homeBtn).toHaveClass('control-btn');
        expect(contactMeBtn).toHaveClass('active-btn');
      });

      it('should render the correct mainBtnsList & secondaryBtnsList', () => {
        testMainAndSecondariesBtns();
      });
    });

    describe('contactsBtn', () => {
      beforeEach(() => {
        const { contactsBtn } = controlElements({ contactsBtn: true });
        user.click(contactsBtn);
      });

      it('should reassign the classes after clicking contactsBtn', () => {
        const { homeBtn, contactsBtn } = controlElements({
          homeBtn: true,
          contactsBtn: true,
        });

        expect(homeBtn).toHaveClass('control-btn');
        expect(contactsBtn).toHaveClass('active-multi-btn');
      });

      it('should render the subBtns once the user clicks on contactsBtn & clicking on contactsBtn should toggle the appearance of these 2 buttons', () => {
        const subs1 = controlElements({ contactsSubs: true });
        expect(subs1.contactFormBtn).toBeInTheDocument();
        expect(subs1.mediaFormBtn).toBeInTheDocument();

        const { contactsBtn } = controlElements({ contactsBtn: true });
        user.click(contactsBtn);

        const subs2 = controlElements({ contactsSubs: true });
        expect(subs2.contactFormBtn).not.toBeInTheDocument();
        expect(subs2.mediaFormBtn).not.toBeInTheDocument();
      });

      it('should render the correct mainBtnsList & secondaryBtnsList', () => {
        const mainBtnsList = [
          'Login',
          'Home',
          'About Me',
          'Portfolio',
          'Contacts',
        ];
        const secondaryBtnsList = [
          'Logout',
          'Profile',
          'Details',
          'Project',
          'Contact Me',
        ];

        testMainAndSecondariesBtns(mainBtnsList, secondaryBtnsList);
      });
    });
  });

  describe('Froms & SubBtns', () => {
    describe('Home', () => {
      describe('Render', () => {
        it('should not render the login form or the profile form initially', () => {
          const home = homeElements({ homePage: true, homeForms: true });
          expect(home.homePage).toBeInTheDocument;
          expect(home.loginForm).not.toBeInTheDocument();
          expect(home.profileForm).not.toBeInTheDocument();
        });

        it('should render the login form', () => {
          // step1: clicking on the login control btn to activate the login form
          const { loginBtn } = controlElements({ loginBtn: true });
          user.click(loginBtn);

          const homeForms = homeElements({ homeForms: true });
          expect(homeForms.loginForm).toBeInTheDocument();

          // step2: make sure it's only the login form on the screen and not the profile form
          expect(homeForms.profileForm).not.toBeInTheDocument();
        });

        it('should render the profile form', () => {
          const { profileBtn } = controlElements({ profileBtn: true });
          user.click(profileBtn);

          const homeForms = homeElements({ homeForms: true });
          expect(homeForms.loginForm).not.toBeInTheDocument();
          expect(homeForms.profileForm).toBeInTheDocument();
        });

        it('should toggle between the login form & the profile form', () => {
          const { loginBtn } = controlElements({ loginBtn: true });
          user.click(loginBtn);

          const homeForms1 = homeElements({ homeForms: true });
          expect(homeForms1.loginForm).toBeInTheDocument();
          expect(homeForms1.profileForm).not.toBeInTheDocument();

          const { profileBtn } = controlElements({ profileBtn: true });
          user.click(profileBtn);

          const homeForms2 = homeElements({ homeForms: true });
          expect(homeForms2.loginForm).not.toBeInTheDocument();
          expect(homeForms2.profileForm).toBeInTheDocument();
        });
      });

      describe('Close', () => {
        describe('Login Form', () => {
          beforeEach(() => {
            const { loginBtn } = controlElements({ loginBtn: true });
            user.click(loginBtn);
          });

          it('should close the login form if the user clicked on the loginBtn', () => {
            const { loginForm } = homeElements({ loginForm: true });
            const { loginBtn } = controlElements({ loginBtn: true });
            user.click(loginBtn);
            expect(loginForm).not.toBeInTheDocument();
          });

          it('should close the login form if the user clicked on the byebyeIcon', () => {
            const { loginForm, byeByeIcon } = homeElements({
              loginForm: true,
              byeByeIcon: true,
            });
            user.click(byeByeIcon);
            expect(loginForm).not.toBeInTheDocument();
          });

          it('should not close the login form if the user clicked on the homeBtn', () => {
            const { loginForm } = homeElements({ loginForm: true });
            const { homeBtn } = controlElements({ homeBtn: true });
            user.click(homeBtn);
            expect(loginForm).toBeInTheDocument();
          });
        });

        describe('Profile Form', () => {
          beforeEach(() => {
            const { profileBtn } = controlElements({ profileBtn: true });
            user.click(profileBtn);
          });

          it('should close the profile form if the user clicked on the profileBtn', () => {
            const { profileForm } = homeElements({ profileForm: true });
            const { profileBtn } = controlElements({ profileBtn: true });
            user.click(profileBtn);
            expect(profileForm).not.toBeInTheDocument();
          });

          it('should close the profile form if the user clicked on the byebyeIcon', () => {
            const { profileForm, byeByeIcon } = homeElements({
              profileForm: true,
              byeByeIcon: true,
            });
            user.click(byeByeIcon);
            expect(profileForm).not.toBeInTheDocument();
          });

          it('should close the profile form if the user clicked on the homeBtn', () => {
            const { profileForm } = homeElements({ profileForm: true });
            const { homeBtn } = controlElements({ homeBtn: true });
            user.click(homeBtn);
            expect(profileForm).not.toBeInTheDocument();
          });
        });
      });
    });

    describe('About Me', () => {
      beforeEach(() => {
        // navigate to aboutMe page
        const { detailsBtn } = controlElements({ detailsBtn: true });
        user.click(detailsBtn);
      });

      describe('Render', () => {
        it('should not render the skill form or the job form initially', () => {
          const aboutMeForms = aboutMeElements({ aboutMeForms: true });
          expect(aboutMeForms.skillForm).not.toBeInTheDocument();
          expect(aboutMeForms.jobForm).not.toBeInTheDocument();
        });

        it('should render the skill form', () => {
          const { skillFormBtn } = controlElements({ detailsSubs: true });
          user.click(skillFormBtn);

          const aboutMeForms = aboutMeElements({ aboutMeForms: true });
          expect(aboutMeForms.skillForm).toBeInTheDocument();
          expect(aboutMeForms.jobForm).not.toBeInTheDocument();
        });

        it('should render the job form', () => {
          const { jobFormBtn } = controlElements({ detailsSubs: true });
          user.click(jobFormBtn);

          const aboutMeForms = aboutMeElements({ aboutMeForms: true });
          expect(aboutMeForms.skillForm).not.toBeInTheDocument();
          expect(aboutMeForms.jobForm).toBeInTheDocument();
        });

        it('should toggle between the skill form & the job form', () => {
          const { skillFormBtn } = controlElements({ detailsSubs: true });
          user.click(skillFormBtn);

          const aboutMeForms1 = aboutMeElements({ aboutMeForms: true });
          expect(aboutMeForms1.skillForm).toBeInTheDocument();
          expect(aboutMeForms1.jobForm).not.toBeInTheDocument();

          const { jobFormBtn } = controlElements({ detailsSubs: true });
          user.click(jobFormBtn);

          const aboutMeForms2 = aboutMeElements({ aboutMeForms: true });
          expect(aboutMeForms2.skillForm).not.toBeInTheDocument();
          expect(aboutMeForms2.jobForm).toBeInTheDocument();
        });
      });

      describe('Close', () => {
        describe('Skill Form', () => {
          beforeEach(() => {
            const { skillFormBtn } = controlElements({ detailsSubs: true });
            user.click(skillFormBtn);
          });

          it('should close the skill form if the user clicked on the skillFormBtn', () => {
            const { skillForm } = aboutMeElements({ skillForm: true });
            const { skillFormBtn } = controlElements({ detailsSubs: true });
            user.click(skillFormBtn);
            expect(skillForm).not.toBeInTheDocument();
          });

          it('should close the skill form if the user clicked on the byebyeIcon', () => {
            const { skillForm, byeByeIcon } = aboutMeElements({
              skillForm: true,
              byeByeIcon: true,
            });
            user.click(byeByeIcon);
            expect(skillForm).not.toBeInTheDocument();
          });
        });

        describe('Job Form', () => {
          beforeEach(() => {
            const { jobFormBtn } = controlElements({ detailsSubs: true });
            user.click(jobFormBtn);
          });

          it('should close the job form if the user clicked on the jobFormBtn', () => {
            const { jobForm } = aboutMeElements({ jobForm: true });
            const { jobFormBtn } = controlElements({ detailsSubs: true });
            user.click(jobFormBtn);
            expect(jobForm).not.toBeInTheDocument();
          });

          it('should close the job form if the user clicked on the byebyeIcon', () => {
            const { jobForm, byeByeIcon } = aboutMeElements({
              jobForm: true,
              byeByeIcon: true,
            });
            user.click(byeByeIcon);
            expect(jobForm).not.toBeInTheDocument();
          });
        });
      });
    });

    describe('Portfolio', () => {
      beforeEach(() => {
        // navigate to portfolio page
        const { projectBtn } = controlElements({ projectBtn: true });
        user.click(projectBtn);
      });

      describe('Render', () => {
        it('should not render the project form or the fetch form initially', () => {
          const portfolioForms = portfolioElements({ portfolioForms: true });
          expect(portfolioForms.projectForm).not.toBeInTheDocument();
          expect(portfolioForms.fetchForm).not.toBeInTheDocument();
        });

        it('should render the project form', () => {
          const { projectFormBtn } = controlElements({ projectSubs: true });
          user.click(projectFormBtn);

          const portfolioForms = portfolioElements({ portfolioForms: true });
          expect(portfolioForms.projectForm).toBeInTheDocument();
          expect(portfolioForms.fetchForm).not.toBeInTheDocument();
        });

        it('should render the fetch form', () => {
          const { fetchFormBtn } = controlElements({ projectSubs: true });
          user.click(fetchFormBtn);

          const portfolioForms = portfolioElements({ portfolioForms: true });
          expect(portfolioForms.projectForm).not.toBeInTheDocument();
          expect(portfolioForms.fetchForm).toBeInTheDocument();
        });

        it('should toggle between the project form & the fetch form', () => {
          const { projectFormBtn } = controlElements({ projectSubs: true });
          user.click(projectFormBtn);

          const portfolioForms1 = portfolioElements({ portfolioForms: true });
          expect(portfolioForms1.projectForm).toBeInTheDocument();
          expect(portfolioForms1.fetchForm).not.toBeInTheDocument();

          const { fetchFormBtn } = controlElements({ projectSubs: true });
          user.click(fetchFormBtn);

          const portfolioForms2 = portfolioElements({ portfolioForms: true });
          expect(portfolioForms2.projectForm).not.toBeInTheDocument();
          expect(portfolioForms2.fetchForm).toBeInTheDocument();
        });
      });

      describe('Close', () => {
        describe('Project Form', () => {
          beforeEach(() => {
            const { projectFormBtn } = controlElements({ projectSubs: true });
            user.click(projectFormBtn);
          });

          it('should close the project form if the user clicked on the projectFormBtn', () => {
            const { projectForm } = portfolioElements({ projectForm: true });
            const { projectFormBtn } = controlElements({ projectSubs: true });
            user.click(projectFormBtn);
            expect(projectForm).not.toBeInTheDocument();
          });

          it('should close the project form if the user clicked on the byebyeIcon', () => {
            const { projectForm, byeByeIcon } = portfolioElements({
              projectForm: true,
              byeByeIcon: true,
            });
            user.click(byeByeIcon);
            expect(projectForm).not.toBeInTheDocument();
          });
        });

        describe('Fetch Form', () => {
          beforeEach(() => {
            const { fetchFormBtn } = controlElements({ projectSubs: true });
            user.click(fetchFormBtn);
          });

          it('should close the fetch form if the user clicked on the fetchFormBtn', () => {
            const { fetchForm } = portfolioElements({ fetchForm: true });
            const { fetchFormBtn } = controlElements({ projectSubs: true });
            user.click(fetchFormBtn);
            expect(fetchForm).not.toBeInTheDocument();
          });

          it('should close the fetch form if the user clicked on the byebyeIcon', () => {
            const { fetchForm, byeByeIcon } = portfolioElements({
              fetchForm: true,
              byeByeIcon: true,
            });
            user.click(byeByeIcon);
            expect(fetchForm).not.toBeInTheDocument();
          });
        });
      });
    });

    describe('Contact Me', () => {
      beforeEach(() => {
        // navigate to contactMe page
        const { contactsBtn } = controlElements({ contactsBtn: true });
        user.click(contactsBtn);
      });

      describe('Render', () => {
        it('should not render the contact form or the media form initially', () => {
          const contactMeForms = contactMeElements({ contactMeForms: true });
          expect(contactMeForms.contactForm).not.toBeInTheDocument();
          expect(contactMeForms.mediaForm).not.toBeInTheDocument();
        });

        it('should render the contact form', () => {
          const { contactFormBtn } = controlElements({ contactsSubs: true });
          user.click(contactFormBtn);

          const contactMeForms = contactMeElements({ contactMeForms: true });
          expect(contactMeForms.contactForm).toBeInTheDocument();
          expect(contactMeForms.mediaForm).not.toBeInTheDocument();
        });

        it('should render the media form', () => {
          const { mediaFormBtn } = controlElements({ contactsSubs: true });
          user.click(mediaFormBtn);

          const contactMeForms = contactMeElements({ contactMeForms: true });
          expect(contactMeForms.contactForm).not.toBeInTheDocument();
          expect(contactMeForms.mediaForm).toBeInTheDocument();
        });

        it('should toggle between the contact form & the media form', () => {
          const { contactFormBtn } = controlElements({ contactsSubs: true });
          user.click(contactFormBtn);

          const contactMeForms1 = contactMeElements({ contactMeForms: true });
          expect(contactMeForms1.contactForm).toBeInTheDocument();
          expect(contactMeForms1.mediaForm).not.toBeInTheDocument();

          const { mediaFormBtn } = controlElements({ contactsSubs: true });
          user.click(mediaFormBtn);

          const contactMeForms2 = contactMeElements({ contactMeForms: true });
          expect(contactMeForms2.contactForm).not.toBeInTheDocument();
          expect(contactMeForms2.mediaForm).toBeInTheDocument();
        });
      });

      describe('Close', () => {
        describe('Contact Form', () => {
          beforeEach(() => {
            const { contactFormBtn } = controlElements({ contactsSubs: true });
            user.click(contactFormBtn);
          });

          it('should close the contact form if the user clicked on the contactFormBtn', () => {
            const { contactForm } = contactMeElements({ contactForm: true });
            const { contactFormBtn } = controlElements({ contactsSubs: true });
            user.click(contactFormBtn);
            expect(contactForm).not.toBeInTheDocument();
          });

          it('should close the contact form if the user clicked on the byebyeIcon', () => {
            const { contactForm, byeByeIcon } = contactMeElements({
              contactForm: true,
              byeByeIcon: true,
            });
            user.click(byeByeIcon);
            expect(contactForm).not.toBeInTheDocument();
          });
        });

        describe('Media Form', () => {
          beforeEach(() => {
            const { mediaFormBtn } = controlElements({ contactsSubs: true });
            user.click(mediaFormBtn);
          });

          it('should close the media form if the user clicked on the mediaFormBtn', () => {
            const { mediaForm } = contactMeElements({ mediaForm: true });
            const { mediaFormBtn } = controlElements({ contactsSubs: true });
            user.click(mediaFormBtn);
            expect(mediaForm).not.toBeInTheDocument();
          });

          it('should close the media form if the user clicked on the byebyeIcon', () => {
            const { mediaForm, byeByeIcon } = contactMeElements({
              mediaForm: true,
              byeByeIcon: true,
            });
            user.click(byeByeIcon);
            expect(mediaForm).not.toBeInTheDocument();
          });
        });
      });
    });
  });
});
