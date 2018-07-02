const Listing = require('./model').Listing
      transaction = require('objection').transaction,
      Knex = require('knex'),
      knexConfig = require('./knexfile'),
      knex = Knex(knexConfig)

Listing.knex(knex)

// fill up the database with some awesome listings
try {
  transaction(knex, async (trx) => {
    await Listing
      .query(trx)
      .insert({
        icon: 'pin',
        title: 'Hatsushiba',
        category: 'station',
        lat: 1.213,
        lng: 1.452
      })
      .catch( err => {
        console.log('error: ', err)
      })
  })
} catch (err) {
  console.log(`It didn\'t quite work master Wayne. ${err}`)
}
