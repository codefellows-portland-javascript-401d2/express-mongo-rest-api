const app = require('./server/app');
const database = require('./server/lib/database');
const port = process.env.PORT || 8080;
const dbUri = process.env.DB_URI || 'mongodb://localhost/godzilla';

app.listen(port, () => {
  database.connect(dbUri);
  console.log(`Server started on http://localhost:${port}/`);
});
