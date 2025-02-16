import { IShortUrl, ShortUrlModel } from '../../models/shortUrl';
import {
  ShortUrlBaseResponse,
  UrlServiceType,
  generateShortIdWithCRC32,
} from '@src/libs';

import { APIConfig } from '../../config';
import UserService from '../userService';

const adaptShortUrlDBModelToShortUrlResponse = (
  shortUrl: IShortUrl
): ShortUrlBaseResponse => {
  return {
    type: UrlServiceType.SHORT_URL,
    id: shortUrl._id.toString(),
    attributes: {
      shortId: shortUrl.shortId,
      originalUrl: shortUrl.originalUrl,
      shortUrl: shortUrl.shortUrl,
      clicks: shortUrl.clicks,
      createdAt: shortUrl.createdAt,
      updatedAt: shortUrl.updatedAt,
    },
  };
};

const getShortUrlById = async (
  id: string
): Promise<ShortUrlBaseResponse | undefined> => {
  const shortUrl = await ShortUrlModel.findById(id);

  if (!shortUrl) {
    return;
  }
  return adaptShortUrlDBModelToShortUrlResponse(shortUrl);
};

const getShortUrlByShortId = async (
  shortId: string
): Promise<ShortUrlBaseResponse | undefined> => {
  const shortUrl = await ShortUrlModel.findOne({
    shortId,
  });

  if (!shortUrl) {
    return;
  }
  return adaptShortUrlDBModelToShortUrlResponse(shortUrl);
};

const getShortUrls = async (): Promise<ShortUrlBaseResponse[]> => {
  const shortUrls = await ShortUrlModel.find({});
  return shortUrls.map((shortUrl) =>
    adaptShortUrlDBModelToShortUrlResponse(shortUrl)
  );
};

const createShortUrl = async ({
  originalUrl,
  userId,
}: {
  originalUrl: string;
  userId: string;
}): Promise<ShortUrlBaseResponse> => {
  /**
   * Generate ID from the original URL, we could use a combination of the user ID and the original URL
   * to ensure uniqueness, but this initial implementation will use just the original URL.
   */
  const shortId = generateShortIdWithCRC32(originalUrl);

  // Check if the short URL already exists, if it does, return it
  const existingUrl = await getShortUrlByShortId(shortId);
  if (existingUrl) {
    await UserService.addUrlToUser(userId, existingUrl.attributes.shortUrl);
    return existingUrl;
  }

  const shortUrl = `${APIConfig.commercialUrl}/${shortId}`;
  const newUrl = new ShortUrlModel({
    shortId,
    originalUrl: originalUrl,
    shortUrl,
    clicks: 0,
  });

  await newUrl.save();
  await UserService.addUrlToUser(userId, shortUrl);
  return adaptShortUrlDBModelToShortUrlResponse(newUrl);
};

/**
 * ShortUrlService
 *
 * This service is responsible for handling the logic for the short url service.
 */
const ShortURLService = {
  getShortUrls,
  getShortUrlById,
  createShortUrl,
  getShortUrlByShortId,
};

export default ShortURLService;
