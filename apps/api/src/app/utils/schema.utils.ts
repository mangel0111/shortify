import mongoose from 'mongoose';
import z from 'zod';

export const dbIdSchema = () =>
  z.custom<string>((val) => {
    return mongoose.Types.ObjectId.isValid(val);
  }, {
    message: 'Invalid MongoDB ObjectId',
  });

  
  export const paginationParamsSchema = z.object({
    size: z.coerce.number().int().positive().max(100).default(10),
    page: z.coerce.number().int().positive().default(1),
  });