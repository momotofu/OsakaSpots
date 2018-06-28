const bookshelf = require('./bookshelf')

const Listing = bookshelf.Model.extend({
  tableName: 'listings',
  hasTimestamps: true,
  test: function() {
    console.log('big test')
  }
})

module.exports = Listing
