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
          yelpId: '_ncMVMISgAlRJ6mKbOWljw',
          icon: 'pin',
          title: 'Bell cafe',
          category: 'food',
          lat: 34.5441948584636,
          lng: 135.531021729112
        },
        {
          yelpId: 'kVS18Mt-PRd3eeJm0r8JJg',
          icon: 'pin',
          title: 'Tori No Keiji',
          category: 'food, ramen',
          lat: 34.5549130004266,
          lng: 135.506566336266
        },
        {
          yelpId: '_ncMVMISgAlRJ6mKbOWljw',
          icon: 'pin',
          title: 'Park',
          category: 'recreation',
          lat: 1.23,
          lng: 12.4
        },
        {
          yelpId: '_ncMVMISgAlRJ6mKbOWljw',
          icon: 'pin',
          title: 'Museum',
          category: 'Science',
          lat: 1.23,
          lng: 12.4
        },
        {
          yelpId: '_ncMVMISgAlRJ6mKbOWljw',
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
  .then(() => {
    console.log('success')
    process.exit()
  })
  .catch(console.error)
