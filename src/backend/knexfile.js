const path = require('path'),
      dbPath = path.resolve(__dirname, './app.db')

module.exports = {
  client: 'sqlite3',
  connection: {
    filename: dbPath
  },
  useNullAsDefault: true,
  debug: true
}

