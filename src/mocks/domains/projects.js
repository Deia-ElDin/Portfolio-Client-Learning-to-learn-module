import { rest } from 'msw';
import { url } from '../baseUrls';
import { mockProjectsData } from '../entities';

export const handlers = [
  rest.get(url('api/v1/projects'), (req, res, ctx) => {
    const params = req.url.searchParams;

    const data = mockProjectsData(params);

    return res(ctx.status(200), ctx.json({ data }));
  }),
];
