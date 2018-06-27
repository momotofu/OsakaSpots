const path = require('path'),
      fs = require('fs'),
      dbFile = fs.openSync(path.join(__dirname, 'app.db'), 'a')

var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dbFile
  }
});

module.exports = require('bookshelf')(knex);
