const path = require('path'),
      fs = require('fs'),
      dbFile = fs.openSync(path.join(__dirname, 'app.db'), 'a')

var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dbFile
  }
});

const bookshelf = require('bookshelf')(knex)
bookshelf.plugin(require('bookshelf-schema'))

module.exports = bookshelf
