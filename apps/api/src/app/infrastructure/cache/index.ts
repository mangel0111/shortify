import Redis from 'ioredis';

let redis = new Redis({
  host: 'localhost',
  port: 6379,
});

/**
 * Handle the Redis instance,
 * if it's not created yet, create a new one.
 *
 * Here we can connect if disconnected, and define all of our strategies
 */
const getRedisInstance = () => {
  if (!redis) {
    redis = new Redis({
      host: 'localhost',
      port: 6379,
    });
  }

  return redis;
};

const CacheService = {
  check: async (): Promise<boolean> => {
    const pingResponse = await getRedisInstance().ping()
    return pingResponse === 'PONG';
  },
  get: async (key: string) => {
    return getRedisInstance().get(key);
  },
  /**
   * Set a key-value pair in the cache
   *
   * The retention time is 24 hours.
   *
   * @param key
   * @param value
   * @returns
   */
  set: async (key: string, value: string) => {
    return getRedisInstance().set(key, value, 'EX', 86400);
  },
  del: async (key: string) => {
    return getRedisInstance().del(key);
  },
};

export default CacheService;
