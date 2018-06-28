const Listing = require('./model')

const HatsushibaStation = new Listing()
HatsushibaStation.set('icon', 'pin')
HatsushibaStation.set('title', 'Hatsushiba')
HatsushibaStation.set('category', 'station')
HatsushibaStation.set('lat', 1.213)
HatsushibaStation.set('lng', 1.452)

saveModel(HatsushibaStation)

function saveModel(model) {
  return model.save().then((listing) => {
    console.log(`saved ${listing.attributes.title} yo!`)
  }).catch((err) => {
    console.log(`error ${err}`)
  })
}
