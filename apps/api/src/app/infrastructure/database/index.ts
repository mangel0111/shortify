import mongoose from 'mongoose';

/**
 * This file is used to export all the database related modules
 */
let db = mongoose.connect('mongodb://localhost:27017/notes_db');

/**
 * Handle the database instance,
 *
 * if it's not created yet, create a new one.
 */
const getDBInstance = async () => {
  if (!db) {
    db = mongoose.connect('mongodb://localhost:27017/notes_db');
  }

  return db;
};

const DatabaseService = {
  check: async (): Promise<boolean> => {
    const dbInstance = await getDBInstance();
    return dbInstance.connection.readyState === 1;
  },
};

export default DatabaseService;
