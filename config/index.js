const dotenv = require('dotenv');

// NODE_ENV set to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Ensure the environment configuration is correctly loaded
const envFound = dotenv.config();
if (envFound.error) {
  throw new Error('The .env file was not found.');
}

module.exports = {
  /**
   * Set the port
   */
  port: process.env.PORT || 3300,

  /**
   * Set the Database properties
   */
  databaseURL: process.env.MONGO_URI,
  databasePort: process.env.MONGO_PORT,
  databaseCollection: process.env.MONGO_COLLECTION,

  /**
   * Set the logger level
   */
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  /**
   * Set the API prefix
   */
  api: {
    prefix: process.env.API_PREFIX || '/api',
  },

  filters: {
    limit: process.env.API_LIMIT,
    skip: process.env.API_SKIP,
    sort: process.env.API_SORT,
  },
};
