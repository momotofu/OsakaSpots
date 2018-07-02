const Model = require('objection').Model

class Listing extends Model {
  static get tableName() {
    return 'listings'
  }
}

module.exports = { Listing }
