const app = require('./lib/app');
const database = require('./lib/database');

const PORT = process.env.PORT || 8080;
const DB_URI = process.env.DB_URI || 'mongodb://localhost/godzilla';

database.connect(DB_URI);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}/`);
});
