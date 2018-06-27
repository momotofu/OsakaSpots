import * as ko from 'knockout'

import googleMap from './googleMap.pug'
import './index.styl'

const template = googleMap()
const viewModel = function(params) {
  const that = this

  /**
   * SET UP GOOGLE MAPS API - START
   */

  // an instance of the Google map
  this.map = {}

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
  }

  this.APIDidLoad.subscribe(function(didLoad) {
    if (didLoad) {
      this.instantiateMap()
    }
  }, this)

  /**
   * SET UP GOOGLE MAPS API - END
   */

  // keep this function at the bottom of this class
  params.callback(this)
}

export default { viewModel, template }
