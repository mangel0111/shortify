/**
 * Short Url Model
 *
 * This service is responsible for handling the logic for the short url model, validations, and integration with the DB.
 */
import mongoose, { Document } from 'mongoose';

export interface IShortUrl extends Document {
  shortId: string;
  originalUrl: string;
  shortUrl: string;
  clicks?: number;
  createdAt: string;
  updatedAt: string;
}

const ShortUrlSchema = new mongoose.Schema<IShortUrl>(
  {
    shortId: { type: String, required: true },  
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true },
    clicks: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const ShortUrlModel = mongoose.model<IShortUrl>(
  'short_urls',
  ShortUrlSchema
);
