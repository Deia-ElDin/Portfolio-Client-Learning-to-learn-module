import { rest } from 'msw';
import { url } from '../baseUrls';
import { mockContactsData, mockContactsErr } from '../entities';

export const handlers = [
  rest.get(url('api/v1/contacts'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ data: mockContactsData }));
  }),

  rest.post(url('api/v1/contacts'), async (req, res, ctx) => {
    const { name, svgLink, info } = await req.json();

    const msg = mockContactsErr(name, svgLink, info);

    return res(ctx.status(400), ctx.json({ msg }));
  }),
];
