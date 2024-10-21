import { screen } from '@testing-library/react';

export const contactMeElements = ({
  contactMePage,
  titles,
  contactList,
  mediaList,
  contactMeForms,
  // contact form
  contactForm,
  contactFormInputs,
  contactFormBtns,
  // media form
  mediaForm,
  mediaFormInputs,
  mediaFormBtns,
  // common elements
  opacitySlider,
  byeByeIcon,
  // contct me form
  contactMeForm,
  contactMeFormInputs,
}) => {
  const obj = {};

  if (contactMePage) {
    obj.contactMePage = screen.queryByRole('region', { name: /contact me/i });
  }
  if (titles) {
    obj.pageTitle = screen.getByRole('heading', { name: /contact me/i });
    obj.pageSubTitle = screen.getByRole('heading', { name: /my contacts/i });
  }
  if (contactList) {
    obj.contactList = screen.getByRole('region', { name: 'My contacts' });
  }
  if (mediaList) {
    obj.mediaList = screen.getByRole('region', { name: 'My social medias' });
  }

  // contact form
  if (contactForm || contactMeForms) {
    obj.contactForm = screen.queryByRole('form', { name: 'Contact form' });
  }
  if (contactFormInputs) {
    obj.nameLabel = screen.getByText('Contact:');
    obj.nameInput = screen.getByRole('textbox', { name: 'Contact:' });
    obj.svgLinkLabel = screen.getByText('SVG Link:');
    obj.svgLinkInput = screen.getByRole('textbox', { name: 'SVG Link:' });
    obj.infoLabel = screen.getByText('Info:');
    obj.infoInput = screen.getByRole('textbox', { name: 'Info:' });
  }
  if (contactFormBtns) {
    obj.createBtn = screen.queryByRole('button', { name: 'Create' });
    obj.updateBtn = screen.queryByRole('button', { name: 'Update' });
    obj.deleteBtn = screen.queryByRole('button', { name: 'Delete' });
  }

  // media form
  if (mediaForm || contactMeForms) {
    obj.mediaForm = screen.queryByRole('form', { name: 'Media form' });
  }
  if (mediaFormInputs) {
    obj.nameLabel = screen.getByText('Social Media:');
    obj.nameInput = screen.getByRole('textbox', { name: 'Social Media:' });
    obj.svgLinkLabel = screen.getByText('SVG Link:');
    obj.svgLinkInput = screen.getByRole('textbox', { name: 'SVG Link:' });
    obj.linkLabel = screen.getByText('Link:');
    obj.linkInput = screen.getByRole('textbox', { name: 'Link:' });
  }
  if (mediaFormBtns) {
    obj.createBtn = screen.queryByRole('button', { name: 'Create' });
    obj.updateBtn = screen.queryByRole('button', { name: 'Update' });
    obj.deleteBtn = screen.queryByRole('button', { name: 'Delete' });
  }

  // common elements
  if (opacitySlider) {
    obj.opacitySlider = screen.getByRole('slider');
  }
  if (byeByeIcon) {
    obj.byeByeIcon = screen.getByRole('img', { name: /close/i });
  }

  // contct me form
  if (contactMeForm) {
    obj.contactMeForm = screen.getByRole('form', {
      name: 'Contact me form',
    });
  }
  if (contactMeFormInputs) {
    obj.nameLabel = screen.getByText('Name:');
    obj.nameInput = screen.getByRole('textbox', { name: 'Name:' });
    obj.emailLabel = screen.getByText('Email:');
    obj.emailInput = screen.getByRole('textbox', { name: 'Email:' });
    obj.subjectLabel = screen.getByText('Subject:');
    obj.subjectInput = screen.getByRole('textbox', { name: 'Subject:' });
    obj.messageLabel = screen.getByText('Message:');
    obj.messageTextArea = screen.getByRole('textbox', { name: 'Message:' });
    obj.sayHelloBtn = screen.getByRole('button', { name: 'Say Hello' });
  }

  return obj;
};
