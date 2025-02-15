import { HttpResponse, http } from 'msw';

import Config from '../config';
import { ShortenUrlResponse } from '../services/shortUrlService';
import { setupServer } from 'msw/node';

const handlers = [
  http.post(`${Config.shortUrlService}/urls`, () => {
    return HttpResponse.json<ShortenUrlResponse>({
      data: {
        type: 'short-url',
        id: 'abc1234',
        attributes: {
          originalUrl: 'https://example.com',
          shortUrl: 'https://short.url/abc1234',
          createdAt: '2021-07-10T00:00:00Z',
        },
      },
    });
  }),
];

export const shortUrlServer = setupServer(...handlers);
