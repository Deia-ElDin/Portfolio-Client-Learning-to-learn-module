import { within, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils';
import { controlElements } from '../helpers/createElements/controls';
import { homeElements } from '../helpers/createElements/home';
import { contactMeElements } from '../helpers/createElements/contactMe';
import { testContact } from '../helpers/testElements/testContact';
import { testMedia } from '../helpers/testElements/testMedia';
import user from '@testing-library/user-event';
import App from '../../App';

describe('App / Contact Me', () => {
  beforeEach(() => {
    renderWithProviders(<App />);

    // navigate to contactMePage
    const { contactMeBtn } = controlElements({ contactMeBtn: true });
    user.click(contactMeBtn);
  });

  describe('Navigate', () => {
    it('should render / navigate to contactMeBtn', () => {
      const { homePage } = homeElements({ homePage: true });
      const { contactMePage } = contactMeElements({ contactMePage: true });

      expect(homePage).not.toBeInTheDocument();
      expect(contactMePage).toBeInTheDocument();
    });
  });

  describe('Layout', () => {
    it('should render the pageTitle & subTitle', () => {
      const { pageTitle, pageSubTitle } = contactMeElements({ titles: true });

      expect(pageTitle).toBeInTheDocument();
      expect(pageSubTitle).toBeInTheDocument();
    });

    it('should render the contact list with all the contacts', async () => {
      const { contactList } = contactMeElements({ contactList: true });

      expect(contactList).toBeInTheDocument();

      // msw respond with 2 contacts
      const contactBlocks = await waitFor(() =>
        within(contactList).findAllByRole('article')
      );
      expect(contactBlocks.length).toBe(2);

      // testing 1st contact
      testContact({ contactBlock: contactBlocks[0], index: 0 });

      // testing 2nd contact
      testContact({ contactBlock: contactBlocks[1], index: 1 });

      const editBtns = within(contactList).getAllByRole('button', {
        name: /edit button/i,
      });
      expect(editBtns.length).toBe(2);

      user.click(editBtns[0]);

      const form = contactMeElements({
        contactForm: true,
        contactFormBtns: true,
      });
      expect(form.contactForm).toBeInTheDocument();
      expect(form.createBtn).not.toBeInTheDocument();
      expect(form.updateBtn).toBeInTheDocument();
      expect(form.deleteBtn).toBeInTheDocument();
    });

    it('should render the media list with all the social medias', async () => {
      const { mediaList } = contactMeElements({ mediaList: true });

      expect(mediaList).toBeInTheDocument();

      // msw respond with 2 medias
      const mediaBlocks = await waitFor(() =>
        within(mediaList).findAllByTestId('btn-container')
      );
      expect(mediaBlocks.length).toBe(2);

      // testing 1st media
      testMedia({ mediaBlock: mediaBlocks[0], index: 0 });

      // testing 2nd media
      testMedia({ mediaBlock: mediaBlocks[1], index: 1 });

      const editBtns = within(mediaList).getAllByRole('button', {
        name: /edit button/i,
      });
      expect(editBtns.length).toBe(2);

      user.click(editBtns[0]);

      const form = contactMeElements({ mediaForm: true, mediaFormBtns: true });
      expect(form.mediaForm).toBeInTheDocument();
      expect(form.createBtn).not.toBeInTheDocument();
      expect(form.updateBtn).toBeInTheDocument();
      expect(form.deleteBtn).toBeInTheDocument();
    });
  });
});
