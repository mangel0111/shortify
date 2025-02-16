import { IShortUrl, ShortUrlModel } from '../../models/shortUrl';
import { ShortUrlBaseResponse, UrlServiceType } from '@src/libs';

const adaptShortUrlDBModelToShortUrlResponse = (
  shortUrl: IShortUrl
): ShortUrlBaseResponse => {
  return {
    type: UrlServiceType.SHORT_URL,
    id: shortUrl.id,
    attributes: {
      originalUrl: shortUrl.originalUrl,
      shortUrl: shortUrl.shortUrl,
      createdAt: shortUrl.createdAt,
      clicks: shortUrl.clicks,
    },
  };
};

/**
 * ShortUrlService
 *
 * This service is responsible for handling the logic for the short url service.
 */
const ShortURLService = {
  getShortUrls: async (): Promise<ShortUrlBaseResponse[]> => {
    const shortUrls = await ShortUrlModel.find({});
    return shortUrls.map((shortUrl) =>
      adaptShortUrlDBModelToShortUrlResponse(shortUrl)
    );
  },
  getShortUrlById: async (id: string): Promise<ShortUrlBaseResponse> => {
    const shortUrl = await ShortUrlModel.findById(id);
    return adaptShortUrlDBModelToShortUrlResponse(shortUrl);
  },
};

export default ShortURLService;
