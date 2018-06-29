const { Listing } = require('./model')
const { transaction } = require('objection')
const knex = Listing.knex()


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
  })
} catch (err) {
  console.log(`It didn\'t quite work master Wayne. ${err}`)
}
