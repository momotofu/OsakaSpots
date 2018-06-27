const bookshelf = require('./bookshelf');
const Fields = require('bookshelf-schema/lib/fields');

const Listing = bookshelf.Model.extend({
  // options
  tablename: 'listing',
  useNullAsDefault: true
  },
  {
    schema: [
      Fields.StringField('icon'),
      Fields.StringField('title'),
      Fields.StringField('category'),
      Fields.FloatField('lat'),
      Fields.FloatField('lng')
    ]
  }
);

module.exports = Listing
