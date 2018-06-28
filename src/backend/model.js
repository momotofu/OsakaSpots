const bookshelf = require('./bookshelf')

const Listing = bookshelf.Model.extend({
  tablename: 'listings',
  hasTimestamps: true
})

module.exports = Listing
