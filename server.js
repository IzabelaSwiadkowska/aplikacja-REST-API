const app = require('./app');
const mongoose = require('mongoose');
const { uriDb, serverPort } = require('./config');

const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    console.log('Database connection successful.');
    app.listen(serverPort, () => {
      console.log(`Server running. Use our API on port: ${serverPort}`);
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });

module.exports = connection;
