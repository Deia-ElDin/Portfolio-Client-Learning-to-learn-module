import { within } from '@testing-library/react';
import { mockContactsData } from '../../../mocks/entities';

const mswData = mockContactsData;

export const testContact = ({ contactBlock, index }) => {
  const contactData = mswData[index];

  const editBtn = within(contactBlock).getByRole('button', {
    name: 'Edit button',
  });
  const contactImg = within(contactBlock).getByRole('img', {
    name: contactData.name,
  });
  const contactName = within(contactBlock).getByText(contactData.name);
  const contactInfo = within(contactBlock).getByText(contactData.info);

  expect(editBtn).toBeInTheDocument();
  expect(contactImg).toBeInTheDocument();
  expect(contactImg).toHaveAttribute('src', contactData.svgLink);
  expect(contactName).toBeInTheDocument();
  expect(contactInfo).toBeInTheDocument();
};
