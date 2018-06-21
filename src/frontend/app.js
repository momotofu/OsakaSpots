import * as ko from 'knockout'
import mainPage from './test.pug'

const rootElement = document.getElementById('root')

function render() {
  const element = document.createElement('div')

  element.innerHTML = mainPage()

  rootElement.appendChild(element)
}

// render HTML
render()

// import and register components
import LikeWidget from './components/likeWidget'

ko.components.register('likewidget', LikeWidget)

// apply bindings for main ViewModel
const main = function() {
  console.log('Knockout is a runnin\'')
}

ko.applyBindings(main, rootElement)

