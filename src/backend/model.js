const knex = require('knex')(require('./knexfile')),
      { Model } = require('objection')

// connect knex and objection
Model.knex(knex)

class Listing extends Model {
  static get tableName() {
    return 'listings'
  }
}

module.exports = { Listing }
