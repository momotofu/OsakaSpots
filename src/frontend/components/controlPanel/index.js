import * as ko from 'knockout'
import * as Fuse from 'fuse.js'
import * as $ from 'jquery'

import controlPanel from './controlPanel'
import Listing from './listing'
import './styles'

const template = controlPanel()
const viewModel = function(params) {
  //////////////////////////////////////////////////////////////////////////////
  // constants
  //////////////////////////////////////////////////////////////////////////////

  this.fuse = null

  //////////////////////////////////////////////////////////////////////////////
  // observables
  //////////////////////////////////////////////////////////////////////////////

  this.visableListings = ko.observableArray([])
  this.listings = ko.observableArray([])
  this.selectedListing = ko.observable()
  this.searchInputData = ko.observable()

  //////////////////////////////////////////////////////////////////////////////
  // setters
  //////////////////////////////////////////////////////////////////////////////

  this.setListings = (listings) => {
    this.listings(listings)
  }

  this.setVisableListings = (listings) => {
    this.visableListings(listings)
  }

  this.setSearchInputData = (inputData) => {
    this.searchInputData(inputData)
  }

  //////////////////////////////////////////////////////////////////////////////
  // getters
  //////////////////////////////////////////////////////////////////////////////

  this.fetchListings = async () => {
    const url = '/listings'

    return await $.getJSON(url, (data) => {
      return data.map((graph) => {
        return new Listing(graph)
      })
    }).fail(console.error)
  }

  //////////////////////////////////////////////////////////////////////////////
  // methods
  //////////////////////////////////////////////////////////////////////////////

  this.controlPanelListingClick = (listing, event) => {
    event.preventDefault()
    this.selectedListing(listing)
  }

  /////////////////////////////////////////////////////////////////////////////
  // subscriptions
  ////////////////////////////////////////////////////////////////////////////

  this.searchInputData.subscribe((inputData) => {
    if (inputData.enterPressed) {
      const listings = this.visableListings()

      if (listings.length > 0)
        this.selectedListing(listings[0])
      return
    }

    const searchString = inputData.searchString
    // update visable listings with fuse results
    if (searchString && searchString.length >= 1) {
      // prevent listings flicker and extra work
      if (this.visableListings().length === 1) return

      this.fuse.list = this.visableListings() // narrow data sample on each query
      this.setVisableListings(this.fuse.search(event.data))

    } else {
      this.setVisableListings(this.listings())
    }

  })

  // any time listings is updated, update the DOM as well
  this.listings.subscribe((listings) => {
    // create a new Fuse.js fuzzy search instance
    this.fuse = new Fuse(listings, {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharlength: 1,
      keys: [
        "title",
        "category"
      ]
    })

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
          this.setListings(listings)
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
