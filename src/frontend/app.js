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
import LikeWidget from './components/likeWidget'

ko.components.register('likewidget', LikeWidget)

// apply bindings for main ViewModel
const main = function() {
  console.log('Knockout is a runnin\' yah')
}

ko.applyBindings(main, rootElement)
