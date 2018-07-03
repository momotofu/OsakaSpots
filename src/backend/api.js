const Listing = require('./model').Listing

// constants
const devMode = process.env.NODE_ENV === 'development'
const googleMapsAPIKey = process.env.GOOGLE_MAPS_API_KEY
console.log('Google Maps API key: ', googleMapsAPIKey)

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


    // Send dummy data until not table found error solved
    //const listings = [
      //{
        //icon: 'pin',
        //title: 'Hatsushiba',
        //category: 'station',
        //lat: 1.23,
        //lng: 12.4
      //},
      //{
        //icon: 'pin',
        //title: 'Ramen shop',
        //category: 'food',
        //lat: 1.23,
        //lng: 12.4
      //},
      //{
        //icon: 'pin',
        //title: 'Bread shop',
        //category: 'food',
        //lat: 1.23,
        //lng: 12.4
      //},
      //{
        //icon: 'pin',
        //title: 'Park',
        //category: 'recreation',
        //lat: 1.23,
        //lng: 12.4
      //},
      //{
        //icon: 'pin',
        //title: 'Museum',
        //category: 'Science',
        //lat: 1.23,
        //lng: 12.4
      //},
      //{
        //icon: 'pin',
        //title: 'Namba',
        //category: 'city',
        //lat: 1.23,
        //lng: 12.4
      //}
    //]
    res.send(listings)
  })
}
