const Listing = require('./model').Listing
const yelp = require('yelp-fusion')

// constants
const devMode = process.env.NODE_ENV === 'development'
const googleMapsAPIKey = process.env.GOOGLE_MAPS_API_KEY
const yelpAPIKey = process.env.YELP_API_KEY
const yelpClient = yelp.client(yelpAPIKey)

// log environment variables
Object.keys(process.env).forEach((key) => {
  if (String(key).indexOf('npm') === -1) {
    console.log(`${key}: ${eval(`process.env.${key}`)}`)
  }
})

// path for the JavaScript bundle
var bundlePath = devMode ? '' : '/assets/js/'

// get the name of hashed JavaScript bundle
if (!devMode) {
  fs.readdir(path.resolve(__dirname, '../../dist'), (err, files) => {
    // there should only be one file
    bundlePath += files[0]
  })
}

/**
 * routes
 */
module.exports = router => {
  router.get('/assets/js/:filename', (req, res) => {
    res.sendFile(path.resolve(__dirname, `../../dist/${req.params.filename}`))
  })

  router.get('/assets/images/:filename', (req, res) => {
    res.sendFile(path.resolve(__dirname, `../../dist/images/${req.params.filename}`))
  })

  router.get('/', async (req, res) => {
    const indexTemplate = await pug.compileFile(path.resolve(__dirname, '../frontend/index.pug'))

    res.send(indexTemplate({
      scriptPath: devMode ? 'http://localhost:2992/assets/bundle.js' : bundlePath,
      googleMapsAPIKey: googleMapsAPIKey
    }))
  })

  router.get('/listings', async (req, res) => {
    const listings = await Listing.query()
      .skipUndefined()
      .catch( err => {
        console.log('err: ', err)
      })

    res.send(listings)
  })

  router.get('/listings/Yelp/business/:id', async (req, res) => {
    yelpClient.business(req.params.id)
      .then(response => {
        const firstResult = response.jsonBody
        const prettyJson = JSON.stringify(firstResult, null, 2)
        res.send(prettyJson)
      })
      .catch(console.error)

  })

  router.get('/listings/Yelp/search', async (req, res) => {
    const searchRequest = {
      term: req.query.term || 'food',
      location: req.query.location || 'Osaka',
    }

    yelpClient.search(searchRequest)
      .then(response => {
        const firstResult = response.jsonBody.businesses
        const prettyJson = JSON.stringify(firstResult, null, 2)
        res.send(prettyJson)
      })
      .catch(console.error)
  })
}
