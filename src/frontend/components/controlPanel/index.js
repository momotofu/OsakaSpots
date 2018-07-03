import * as ko from 'knockout'
import * as $ from 'jquery'

import googleMap from './controlPanel'
import Listing from './listing'
import './styles'

const template = googleMap()
const viewModel = function(params) {
  this.listings = ko.observableArray()
  this.init = function() {
    // check if listings are in user's local storage
    if (!localStorage.osakaSpots && !localStorage.osakaSpots.listings) {
      localStorage.osakaSpots = JSON.stringify({})
      localStorage.osakaSpots.listings = JSON.stringify([
        // create a dummy listing while server data is fetched
        new Listing('pin', 'Hatsushiba Station', '{lat: 0, lng: 0}', 'station')
      ])

      this.fetchListings()
    } else {
      this.listings(JSON.parse(localStorage.osakaSpots.listings))
    }
  }

  // getters
  this.fetchListings = async function() {
    const url = '/listings'

    return await $.getJSON(url, function(data) {
      return JSON.parse(data).map((graph) => {
        return new Listing(graph)
      })
    })
      .fail(function(error) {
        console.log('error: ', error)
      })
  }

  // keep this function at the bottom of this class
  params.callback(this)
}

export default { viewModel, template }
