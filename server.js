const mongoose = require('./lib/setup-mongoose');
const app = require('./lib/app');
const port = 8080;    //any merit to setting env right now?

mongoose('mongodb://localhost:27017');

app.listen(port, () =>{
  console.log(`server be servin on port ${port}`);
});
