/**
 * Short Url Model
 *
 * This service is responsible for handling the logic for the short url model, validations, and integration with the DB.
 */
import mongoose, { Document } from 'mongoose';

export interface IShortUrl extends Document {
  id: string;
  userId: string;
  originalUrl: string;
  shortUrl: string;
  createdAt: string;
  clicks?: number;
}

const ShortUrlSchema = new mongoose.Schema<IShortUrl>({
  id: { type: String, required: true, unique: true, index: true }, // Ensures uniqueness & performance
  userId: { type: String, required: true },
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true },
  createdAt: { type: String, default: () => new Date().toISOString() },
  clicks: { type: Number, default: 0 },
});

export const ShortUrlModel = mongoose.model<IShortUrl>('short_urls', ShortUrlSchema);