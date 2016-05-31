const config = require('./config');
const app = require('./lib/app');
const database = require('./lib/database');

app.listen(config.port, () => {
  console.log(`Server started on http://localhost:${config.port}/`);

  database.connect(config.dbUri);
});
