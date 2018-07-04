import * as ko from 'knockout'
import * as $ from 'jquery'

import googleMap from './controlPanel'
import Listing from './listing'
import './styles'

const template = googleMap()
const viewModel = function(params) {
  this.visableListings = ko.observableArray([])
  this.listings = ko.observableArray([])

  //////////////////////////////////////////////////////////////////////////////
  // setters
  //////////////////////////////////////////////////////////////////////////////

  this.setListings = (listings) => {
    this.listings(listings)
  }

  //////////////////////////////////////////////////////////////////////////////
  // getters
  //////////////////////////////////////////////////////////////////////////////

  this.fetchListings = async function() {
    const url = '/listings'

    return await $.getJSON(url, function(data) {
      return data.map((graph) => {
        return new Listing(graph)
      })
    }).fail(console.error)

  /////////////////////////////////////////////////////////////////////////////
  // subscriptions
  ////////////////////////////////////////////////////////////////////////////

  // any time listings is updated, update the DOM as well
  this.listings.subscribe((listings) => {
    this.visableListings(listings)
  })


  //////////////////////////////////////////////////////////////////////////////
  // Initializer
  //////////////////////////////////////////////////////////////////////////////

  this.init = function() {
    // check if listings are in user's local storage
    if (!localStorage.osakaSpots || !JSON.parse(localStorage.osakaSpots).hasOwnProperty('listings')) {
      localStorage.osakaSpots = JSON.stringify({
        listings: [
          // create a dummy listing while server data is fetched
          new Listing('pin', 'Hatsushiba Station', '{lat: 0, lng: 0}', 'station')
        ]
      })

      // fetch listings from server. On success update listings observableArray
      this.fetchListings()
        .then(listings => {
          this.listings(listings)
          localStorage.osakaSpots = JSON.stringify({ listings })
        })
        .catch(console.error)

    } else {
      // if listings is already stored locally, then populate listings
      // observable array with local data.
      this.listings(JSON.parse(localStorage.osakaSpots).listings)
    }
  }

  // keep this function at the bottom of this class
  params.callback(this)
}

export default { viewModel, template }
