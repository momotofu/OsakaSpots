exports.up = function(knex) {
  return knex.schema
    .createTable('listings', function(table) {
      table.increments('id').primary()
      table.string('icon').defaultTo('pin')
      table.string('title', 128)
      table.string('category')
      table.float('lat')
      table.float('lng')
      table.timestamps()
    })
}

exports.down = function(knex) {
  return knex.schema
    .dropTable('listings')
}
