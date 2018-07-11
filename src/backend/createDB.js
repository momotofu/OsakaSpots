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
          category: 'food, cafe',
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
          yelpId: '795ar5z7At4Hd2U8HVSCJw',
          icon: 'pin',
          title: 'Critters Burger',
          category: 'food, burger, burgers, american',
          lat: 34.6742121,
          lng: 135.4986354
        },
        {
          yelpId: 'FElFjUQAlCG7Bx6Sks8tUQ',
          icon: 'pin',
          title: 'Toho Cinemas Namba annex',
          category: 'movie, entertainment, movietheaters, cinema',
          lat: 34.665792,
          lng: 135.503163
        },
        {
          yelpId: 'sk1FbgrpJKFb1tomMCRA4Q',
          icon: 'pin',
          title: 'El Pancho Shinsaibashi',
          category: 'food, mexican, tacos, taco, burritos',
          lat: 34.6748287,
          lng: 135.5011935
        },
        {
          yelpId: 'y223PkinRw3Q2t_qznomwQ',
          icon: 'pin',
          title: 'Senjunoyu',
          category: 'onsen, hotspring, relaxation, spa, bath, public bath',
          lat: 34.5447810272016,
          lng: 135.526481871338
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
