import mongoose from 'mongoose';
import z from 'zod';

export const dbIdSchema = () =>
  z.custom<string>((val) => {
    return mongoose.Types.ObjectId.isValid(val);
  }, {
    message: 'Invalid MongoDB ObjectId',
  });
