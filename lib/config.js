const config = {
  dbUri: process.env.DB_URI || 'mongodb://localhost/godzilla',
  jwtSecret: process.env.JWT_SECRET || 'gojira',
  port: process.env.PORT || 8080
};

module.exports = config;
