const path = require('path'),
      fs = require('fs'),
      knex = require('knex')(require('./knexfile'))

module.exports =  require('bookshelf')(knex)
