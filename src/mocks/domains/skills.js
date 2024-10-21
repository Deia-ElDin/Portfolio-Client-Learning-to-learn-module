import { rest } from 'msw';
import { url } from '../baseUrls';
import { mockSkillsData, mockSkillsErr } from '../entities';

export const handlers = [
  rest.get(url('api/v1/skills'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ data: mockSkillsData }));
  }),

  rest.post(url('api/v1/skills'), async (req, res, ctx) => {
    const { name, svgLink, percentage } = await req.json();

    const msg = mockSkillsErr(name, svgLink, percentage);

    return res(ctx.status(400), ctx.json({ msg }));
  }),
];
