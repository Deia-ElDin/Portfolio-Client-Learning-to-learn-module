import { rest } from 'msw';
import { url } from '../baseUrls';
import { mockProfileData } from '../entities';

export const handlers = [
  rest.get(url('api/v1/profile'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ data: mockProfileData }));
  }),
];
