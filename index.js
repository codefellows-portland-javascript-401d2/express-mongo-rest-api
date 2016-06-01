const config = require('./config');
const app = require('./lib/app');
const database = require('./lib/database');

database.connect(config.dbUri);

app.listen(config.port, () => {
  console.log(`Server started on http://localhost:${config.port}/`);
});

