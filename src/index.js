import template from './index.pug'

function component() {
  var element = document.createElement('div')

  // Lodash, now imported by this script
  element.innerHTML = template({
    name: "test'"
  })

  return element
}

document.body.appendChild(component())
