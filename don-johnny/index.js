const app = require('./server/app');
const database = require('./server/lib/database');

const PORT = process.env.PORT || 8080;
const DB_URI = process.env.DB_URI || 'mongodb://localhost/godzilla';

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}/`);

  database.connect(DB_URI);
});
