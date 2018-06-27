const Listing = require('./model')

const testListing = new Listing()
testListing.set('icon', 'pin')
testListing.set('title', 'Hatsushiba')
testListing.set('category', 'station')
testListing.set('lat', 1.213)
testListing.set('icon', 1.452)

testListing.save().then(function(listing) {
  console.log(`saved ${listing.title} yo!`)
})
