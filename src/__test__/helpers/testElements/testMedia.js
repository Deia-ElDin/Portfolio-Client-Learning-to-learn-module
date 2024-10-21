import { within } from '@testing-library/react';
import { mockMediasData } from '../../../mocks/entities';

const mswData = mockMediasData;

export const testMedia = ({ mediaBlock, index }) => {
  const mediaData = mswData[index];

  const editBtn = within(mediaBlock).getByRole('button', {
    name: 'Edit button',
  });
  const anchorBtn = within(mediaBlock).getByRole('button', {
    name: mediaData.name,
  });
  const btnLink = within(anchorBtn).getByRole('link');
  const btnImg = within(anchorBtn).getByRole('img', { name: mediaData.name });

  expect(editBtn).toBeInTheDocument();
  expect(anchorBtn).toBeInTheDocument();
  expect(btnLink).toBeInTheDocument();
  expect(btnLink).toHaveAttribute('href', mediaData.link);
  expect(btnImg).toBeInTheDocument();
  expect(btnImg).toHaveAttribute('src', mediaData.svgLink);
  expect(btnLink).toBeInTheDocument();
};
