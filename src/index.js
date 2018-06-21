import template from './index.pug'

function component() {
  var element = document.createElement('div')

  // Lodash, now imported by this script
  element.innerHTML = template({
    name: "Chris'"
  })

  return element
}

document.body.appendChild(component())
