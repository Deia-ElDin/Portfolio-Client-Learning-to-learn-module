import { rest } from 'msw';
import { url } from '../baseUrls';
import { mockLoginErr } from '../entities';

export const handlers = [
  rest.post(url('auth/login'), async (req, res, ctx) => {
    const { username, password } = await req.json();

    const msg = mockLoginErr(username, password);

    return res(ctx.status(400), ctx.json({ msg }));
  }),
];
