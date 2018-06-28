const Listing = require('./model')

const testListing = new Listing()
testListing.test()
testListing.set('icon', 'pin')
testListing.set('title', 'Hatsushiba')
testListing.set('category', 'station')
testListing.set('lat', 1.213)
testListing.set('lng', 1.452)

testListing.save().then((listing) => {
  console.log(`saved ${listing.title} yo!`)
}).catch((err) => {
  console.log(`error ${err}`)
})
