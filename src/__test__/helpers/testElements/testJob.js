import { within } from '@testing-library/react';
import { mockJobsData } from '../../../mocks/entities';

const mswData = mockJobsData;

export const testJob = ({ jobBlock, index }) => {
  const jobData = mswData[index];

  const workingPeriod = within(jobBlock).getByText(
    `${jobData.startingDate} - ${jobData.finishingDate}`
  );
  const countryName = within(jobBlock).getByText(jobData.countryName);
  const countryImg = within(jobBlock).queryByRole('img', {
    name: jobData.countryName,
  });
  const jobTitleSpan = within(jobBlock).getByText(jobData.jobTitle);
  const companyName = within(jobBlock).getByText(`- ${jobData.companyName}`);
  const jobDescription = within(jobBlock).getByText(jobData.jobDescription);

  expect(workingPeriod).toBeInTheDocument();
  expect(countryName).toBeInTheDocument();
  expect(countryImg).toHaveAttribute('src', jobData.countrySVGLink);
  expect(jobTitleSpan).toBeInTheDocument();
  expect(companyName).toBeInTheDocument();
  expect(jobDescription).toBeInTheDocument();
};
