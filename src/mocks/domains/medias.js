import { rest } from 'msw';
import { url } from '../baseUrls';
import { mockMediasData, mockMediasErr } from '../entities';

export const handlers = [
  rest.get(url('api/v1/medias'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ data: mockMediasData }));
  }),

  rest.post(url('api/v1/medias'), async (req, res, ctx) => {
    const { name, svgLink, link } = await req.json();

    const msg = mockMediasErr(name, svgLink, link);

    return res(ctx.status(400), ctx.json({ msg }));
  }),
];
