exports.up = function(knex) {
  return knex.schema
    .createTable('listings', table => {
      table.increments('id').primary()
      table.string('yelpId')
      table.string('icon').defaultTo('pin')
      table.string('title', 128).unique()
      table.string('category')
      table.float('lat')
      table.float('lng')
      table.timestamps()
    })
}

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('listings')
}
