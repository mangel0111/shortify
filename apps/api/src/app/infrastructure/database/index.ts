import { APIConfig } from '../../config';
import mongoose from 'mongoose';

/**
 * This file is used to export all the database related modules
 */
const connectionString = APIConfig.db.connectionString;
let db = mongoose.connect(connectionString);

/**
 * Handle the database instance,
 *
 * if it's not created yet, create a new one.
 */
const getDBInstance = async () => {
  if (!db) {
    try {
      db = mongoose.connect(connectionString);
    } catch (error) {
      console.error('Database connection error', error);
    }
  }

  return db;
};

const DatabaseService = {
  create: async (): Promise<void> => {
    await getDBInstance();
  },
  check: async (): Promise<boolean> => {
    const dbInstance = await getDBInstance();
    return dbInstance.connection.readyState === 1;
  },
};

export default DatabaseService;
