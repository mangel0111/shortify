type APIConfigProps = {
  /**
   * Commercial URL.
   *
   * This is the URL that will be used to generate the short URL.
   */
  commercialUrl: string;
  port: string | number;
  host: string;
  /**
   * Database configuration
   */
  db: {
    connectionString: string;
  };
  /**
   * Cache configuration
   */
  cache: {
    host: string;
    port: number;
  };
};

export const APIConfig: APIConfigProps = {
  commercialUrl: 'http://localhost:3000',
  port: process.env.PORT || 3000,
  host: process.env.HOST,
  db: {
    connectionString:
      'mongodb://admin:password@localhost:27017/shortifydb?authSource=admin',
  },
  cache: {
    host: 'localhost',
    port: 6379,
  },
};
