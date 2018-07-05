import * as ko from 'knockout'

import googleMap from './googleMap.pug'
import './index.styl'

const template = googleMap()
const viewModel = function(params) {
  const that = this

  this.map = null
  this.listings = ko.observableArray([])
  this.markers = {}
  this.infoWindow = null

  // setters
  this.setListings = (listings) => {
    this.listings(listings)
  }

  //////////////////////////////////////////////////////////////////////////////
  // methods
  //////////////////////////////////////////////////////////////////////////////

  this.zoomToListing = (listing) => {
    console.log(`zoom to ${listing.title}`)
  }

  const populateInfoWindow = (marker, infowindow) => {
    if (infowindow.marker != marker) {
      infowindow.setContent('')
      infowindow.marker = marker
      infowindow.setContent(
      `<div>${marker.title}</div>`)


      // make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick', function() {
        infowindow.marker = null;
      })

      infowindow.open(map, marker)
    }
  }


  // create a google maps marker and add default listeners
  this.createMarker = (data) => {
    const marker = new google.maps.Marker({
      position: {lat: 34.629900, lng: 135.496302}, //{ lat: data.lat, lng: data.lng },
      title: data.title,
      animation: google.maps.Animation.DROP,
      id: data.id,
      map: this.map,
      isVisable: true
    })

    // add event listeners
    marker.addListener('click', function() {
      console.log('I was clicked', this.title)
      populateInfoWindow(this, that.infoWindow)
    })

    return marker
  }

  // this is called whenever the visable markers in the control panel
  // component are updated
  this.updateMarkers = (listings) => {
    if (!this.map) return

    // set all markers to not visible
    for (let key in this.markers) {
      this.markers[key].isVisable = false
    }

    // set incoming markers to visible
    listings.forEach((listing) => {
      // if the marker hasn't already been created then create it
      if (!(listing.id in this.markers)) {
        this.markers[listing.id] = this.createMarker(listing)
          // otherwise set the marker to visible
      } else {
        this.markers[listing.id].isVisable = true
      }

    })

    // only display visible markers on map
    for (let key in this.markers) {
      if (!this.markers[key].isVisable) {
        this.markers[key].setMap(null)
      } else {
        this.markers[key].setMap(this.map)
      }
    }

  }

  //////////////////////////////////////////////////////////////////////////////
  // SET UP GOOGLE MAPS API - START
  //////////////////////////////////////////////////////////////////////////////

  // when this is changed to true, the map is instantiated via observiable
  // subscription
  this.APIDidLoad = ko.observable(false)

  // sets up the Google API scripts and loads the map
  this.initGoogleMaps = function() {
    // create a Google API Script
    const APIScript = document.createElement('script')
    window.APIScriptCallback = document.createElement('script')

    APIScript.setAttribute('src', `https://maps.googleapis.com/maps/api/js?libraries=places,geometry,drawing&key=${window.GOOGLE_MAPS_API_KEY}&v=3&callback=GoogleAPIReady`)
    APIScript.defer = true
    APIScript.async = true

    APIScriptCallback.addEventListener('GoogleAPIReady', function(e) {
      that.APIDidLoad(true)
    })

    // create a callback to fire when Google API has loaded
    APIScriptCallback.text = `
        window.GoogleAPIReady = function() {
          window.APIScriptCallback.dispatchEvent(new Event('GoogleAPIReady'))
        }
    `

    // add Google JavaScript API script to document body
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(APIScriptCallback, firstScriptTag)
    firstScriptTag.parentNode.insertBefore(APIScript, firstScriptTag)
  }

  // methods
  this.instantiateMap = function() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 34.629900, lng: 135.496302},
      zoom: 13,
      mapTypeControl: false
    });
    this.infoWindow =  new google.maps.InfoWindow();
    this.updateMarkers(that.listings())
  }

  this.APIDidLoad.subscribe(function(didLoad) {
    if (didLoad){
      this.instantiateMap()
    }
  }, this)

  //////////////////////////////////////////////////////////////////////////////
  // SET UP GOOGLE MAPS API - END
  //////////////////////////////////////////////////////////////////////////////


  //////////////////////////////////////////////////////////////////////////////
  // Subscriptions
  //////////////////////////////////////////////////////////////////////////////

  this.listings.subscribe((listings) => {
    this.updateMarkers(listings)
  })
  // keep this function at the bottom of this class
  params.callback(this)
}

export default { viewModel, template }
