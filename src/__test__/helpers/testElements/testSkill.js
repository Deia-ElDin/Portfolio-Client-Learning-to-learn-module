import { within } from '@testing-library/react';
import { mockSkillsData } from '../../../mocks/entities';

const mswData = mockSkillsData;

export const testSkill = ({ skillBlock, index }) => {
  const skillData = mswData[index];

  const name = within(skillBlock).getByRole('heading', {
    name: skillData.name,
  });
  const img = within(skillBlock).getByRole('img', { name: skillData.name });
  const percentageText = within(skillBlock).getByText(
    `${skillData.percentage} %`
  );
  const percentageBar = within(skillBlock).getByTestId('bar');

  expect(name).toBeInTheDocument();
  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute('src', skillData.svgLink);
  expect(percentageText).toBeInTheDocument();
  expect(percentageBar).toBeInTheDocument();
  expect(percentageBar).toHaveStyle(`width: ${skillData.percentage}%`);
};
