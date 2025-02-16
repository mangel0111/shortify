/**
 * User Models
 *
 * This service is responsible for handling the logic for the user model, validations, and integration with the DB.
 */
import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  urlsShortened: string[];
  name: string;
  createdAt: string;
  updatedAt: string;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    urlsShortened: { type: [String], default: [] },
    name: { type: String },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<IUser>('users', UserSchema);
