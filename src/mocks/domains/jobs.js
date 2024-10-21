import { rest } from 'msw';
import { url } from '../baseUrls';
import { mockJobsData, mockJobsErr } from '../entities';

export const handlers = [
  rest.get(url('api/v1/jobs'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ data: mockJobsData }));
  }),

  rest.post(url('api/v1/jobs'), async (req, res, ctx) => {
    const {
      countryName,
      countrySVGLink,
      companyName,
      jobTitle,
      jobDescription,
      startingDate,
      finishingDate,
    } = await req.json();

    const msg = mockJobsErr(
      countryName,
      countrySVGLink,
      companyName,
      jobTitle,
      jobDescription,
      startingDate,
      finishingDate
    );

    return res(ctx.status(400), ctx.json({ msg }));
  }),
];
