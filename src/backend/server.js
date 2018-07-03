const express = require('express')
      path = require('path'),
      fs = require('fs'),
      pug = require('pug'),
      promiseRouter = require('express-promise-router'),
      registerAPI = require('./api'),
      Listing = require('./model').Listing,
      Model = require('objection').Model,
      Knex = require('knex'),
      knexConfig = require('./knexfile'),
      knex = Knex(knexConfig)


// connect Objection ORM to database
Model.knex(knex)

// set up express app
const router = promiseRouter()
const app = express()
  .use(router)
  .set('json spaces', 2)

// register API
registerAPI(router)

app.use((err, req, res, next) => {
  if (err) {
    res.status(err.statusCode || err.status || 500).send(err.data || err.message || {});
  } else {
    next();
  }
});

app.listen(process.env.PORT || 9000, () => {
  console.log(`OsakaSpots app - Listening on port ${process.env.PORT || 9000}!`)
})
