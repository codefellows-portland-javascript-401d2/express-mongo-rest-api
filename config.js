const config = {
  port: process.env.PORT || 8080,
  dbUri: process.env.DB_URI || 'mongodb://localhost/godzilla'
};

module.exports = config;
