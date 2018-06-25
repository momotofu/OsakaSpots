// dependencies
import * as ko from 'knockout'

import mainPage from './mainPage.pug'

const rootElement = document.getElementById('root')

// render HTML
function render() {
  const element = document.createElement('div')

  element.innerHTML = mainPage()
  rootElement.prepend(element)
  console.log('sup')
}

render()

// import and register components
import GoogleMap from './components/googleMap'

ko.components.register('googlemap', GoogleMap)

// apply bindings for main ViewModel
function Main() {
  console.log('Knockout is a runnin\' yah')

  this.initMaps = function(GoogleMapsVM) {
    GoogleMapsVM.init()
  }
}

const MainViewModel = new Main()

ko.applyBindings(MainViewModel, rootElement)
