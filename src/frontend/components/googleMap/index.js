import * as ko from 'knockout'

import googleMap from './googleMap.pug'
import './index.styl'
import infoWindowTemplate from './infoWindow.pug'

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
    this.map.setCenter({ lat: listing.lat + .0061, lng: listing.lng })
    this.map.setZoom(15)
    markerClickEvent.call(this.markers[listing.id])
  }

  const getYelpJSON = async (id) => {
    const res = await fetch(`/listings/Yelp/business/${id}`)
    return res.json()
  }

  const populateInfoWindow = (marker, infoWindow) => {
    if (infoWindow.marker != marker) {
      infoWindow.setContent('')
      infoWindow.marker = marker
      infoWindow.setContent(
        `<div id="infoWindow">
          <div class="card-body">
          <h5 class="card-title">${marker.title}</h5>
          </div>
        </div>`)

      // get JSON from yelp api and populate infoWindow html with data
      getYelpJSON(marker.id)
        .then((json) => {
          const infoWindowEl = document.getElementById('infoWindow')
          infoWindowEl.innerHTML = infoWindowTemplate({
            imageSource: json.image_url.length > 0 ? json.image_url : '/assets/images/i_dont_know.gif',
            name: json.name,
            alias: json.alias,
            url: json.url,
            rating: json.rating,
            phone: json.phone
          })
        })
        .catch((err) => {
          console.error(err)
        })


      // make sure the marker property is cleared if the infoWindow is closed.
      infoWindow.addListener('closeclick', function() {
        infoWindow.marker = null;
      })

      infoWindow.open(map, marker)
    }
  }


  // create a google maps marker and add default listeners
  this.createMarker = (data) => {
    const marker = new google.maps.Marker({
      position: { lat: data.lat, lng: data.lng },
      title: data.title,
      animation: google.maps.Animation.DROP,
      id: data.yelpId,
      map: this.map,
      isVisable: true
    })

    // add event listeners
    marker.addListener('click', markerClickEvent)

    return marker
  }

  const markerClickEvent = function() {
    populateInfoWindow(this, that.infoWindow)

    // animate marker
    if (this.getAnimation() != null) {
        this.setAnimation(null);
    } else {
        this.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(() => {
          this.setAnimation(null)
        }, 2000)
    }
  }

  // this is called whenever the visable markers in the control panel
  // component are updated
  this.updateMarkers = (listings) => {
    if (!this.map) return;
    if (listings.length == Object.keys(this.markers).length) {
      this.map.setZoom(12)
      this.map.setCenter({ lat: 34.629900, lng:135.496302})

      if (this.infoWindow) {
        this.infoWindow.setMap(null)
      }
    }

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
      zoom: 12,
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
