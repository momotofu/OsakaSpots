const bookshelf = require('./bookshelf')

const Listing = bookshelf.Model.extend({
  tableName: 'listings',
  hasTimestamps: true
})

module.exports.Listing = Listing
