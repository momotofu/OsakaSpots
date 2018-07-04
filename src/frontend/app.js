// dependencies
import * as ko from 'knockout'

import mainPage from './mainPage.pug'

const rootElement = document.getElementById('root')

// render HTML
function render() {
  const element = document.createElement('div')

  element.innerHTML = mainPage()
  rootElement.prepend(element)
}

render()

// import and register components
import GoogleMap from './components/googleMap'
import ControlPanel from './components/controlPanel'

ko.components.register('googlemap', GoogleMap)
ko.components.register('controlpanel', ControlPanel)

// apply bindings for main ViewModel
function Main() {
  console.log('Knockout is a runnin\' yah')
  this.listings = []

  this.initMaps = function(GoogleMapsVM) {
    GoogleMapsVM.setListings(this.listings)
    GoogleMapsVM.initGoogleMaps()
  }.bind(this)

  this.initControlPanel = function(controlPanel) {
    controlPanel.visableListings.subscribe((listings) => {
      this.listings = listings
    })
    controlPanel.init()
  }.bind(this)

}

const MainViewModel = new Main()

ko.applyBindings(MainViewModel, rootElement)
