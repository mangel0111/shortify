import { IShortUrl, ShortUrlModel } from '../../models/shortUrl';
import {
  ShortUrlBaseResponse,
  UrlServiceType,
  generateShortIdWithCRC32,
} from '@src/libs';

import { APIConfig } from '../../config';
import CacheService from '../../infrastructure/cache';
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

const updateClickCountById = async (id: string): Promise<void> => {
  await ShortUrlModel.findByIdAndUpdate(id, {
    $inc: { clicks: 1 },
  });
};

const getShortUrlByShortId = async (
  shortId: string
): Promise<ShortUrlBaseResponse | undefined> => {
  const cachedUrl = await CacheService.get(shortId);

  /**
   * If the URL is cached, return it
   */
  if (cachedUrl) {
    return JSON.parse(cachedUrl) as ShortUrlBaseResponse;
  }

  const shortUrl = await ShortUrlModel.findOne({
    shortId,
  });

  if (!shortUrl) {
    return;
  }

  const parsedShortUrl = adaptShortUrlDBModelToShortUrlResponse(shortUrl);

  // Store the URL in the cache
  CacheService.set(shortId, JSON.stringify(parsedShortUrl));

  return parsedShortUrl;
};

const getShortUrls = async ({
  shortUrlIds,
  page,
  size,
}: {
  shortUrlIds?: string[];
  page?: number;
  size?: number;
}): Promise<{
  shortUrls: ShortUrlBaseResponse[];
  total: number;
}> => {
  const limit = Math.max(size, 1); // Ensure size is at least 1
  const skip = (page - 1) * limit;

  let query = {};
  if (shortUrlIds) {
    query = { shortId: { $in: shortUrlIds } };
  }
  const shortUrls = await ShortUrlModel.find(query)
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: -1 });
  const total = await ShortUrlModel.countDocuments(query);
  return {
    shortUrls: shortUrls.map(adaptShortUrlDBModelToShortUrlResponse),
    total,
  };
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
  updateClickCountById,
};

export default ShortURLService;
