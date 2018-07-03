const Listing = require('./model').Listing
      transaction = require('objection').transaction,
      Knex = require('knex'),
      knexConfig = require('./knexfile'),
      knex = Knex(knexConfig)

Listing.knex(knex)

// fill up the database with some awesome listings
async function main() {
  return await transaction(knex, async (trx) => {
    await Listing
      .query(trx)
      .insertGraph([
        {
          icon: 'pin',
          title: 'Hatsushiba',
          category: 'station',
          lat: 1.23,
          lng: 12.4
        },
        {
          icon: 'pin',
          title: 'Ramen shop',
          category: 'food',
          lat: 1.23,
          lng: 12.4
        },
        {
          icon: 'pin',
          title: 'Bread shop',
          category: 'food',
          lat: 1.23,
          lng: 12.4
        },
        {
          icon: 'pin',
          title: 'Park',
          category: 'recreation',
          lat: 1.23,
          lng: 12.4
        },
        {
          icon: 'pin',
          title: 'Museum',
          category: 'Science',
          lat: 1.23,
          lng: 12.4
        },
        {
          icon: 'pin',
          title: 'Namba',
          category: 'city',
          lat: 1.23,
          lng: 12.4
        }
      ])
  })
}

main()
  .then(() => console.log('success'))
  .catch(console.error)
