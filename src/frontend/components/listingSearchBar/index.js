import * as ko from 'knockout'

import listingSearchbar from './listingSearchbar'
import './styles'

const template = listingSearchbar()
const viewModel = function(params) {
  //////////////////////////////////////////////////////////////////////////////
  // constants
  //////////////////////////////////////////////////////////////////////////////

  const inputCursor = document.getElementsByClassName('listingSearchbar__cursor')[0]

  //////////////////////////////////////////////////////////////////////////////
  // observables
  //////////////////////////////////////////////////////////////////////////////

  this.inputData = ko.observable({
    searchString: null,
    enterPressed: false
  })

  //////////////////////////////////////////////////////////////////////////////
  // methods
  //////////////////////////////////////////////////////////////////////////////

  this.searchInputChange = (viewModel, event) => {
    event.preventDefault()
    this.inputData({
      searchString: event.target.value,
      enterPressed: false
    })
  }


  this.searchInputEnter = (viewModel, event) => {
    event.preventDefault()
    this.inputData({
      searchString: event.target.value,
      enterPressed: true
    })

  }

  // cursor logic
  var cursorIsHidden = false
  var timerId = null

  const flickerCursor = () => {
     cursorIsHidden = !cursorIsHidden

      if (cursorIsHidden)
        inputCursor.style.opacity = 1
      else
        inputCursor.style.opacity = 0
  }

  this.startTimer = () => {
    // flicker cursor once on focus
    flickerCursor()

    // set a repeating timer, and capture interval id for focusout event
    timerId = window.setInterval(() => {
      flickerCursor()
    }, 700)
  }

  this.stopTimer = () => {
    clearTimeout(timerId)
    inputCursor.style.opacity = 0
  }

  const updateCursor = (length) => {
    if (length === 1)
      inputCursor.style.marginLeft = '12px'
    else
      inputCursor.style.marginLeft = `${length + 18}px`
  }

  //////////////////////////////////////////////////////////////////////////////
  // subscriptions
  //////////////////////////////////////////////////////////////////////////////

  this.inputData.subscribe((inputData) => {
    // measure the pixel width if the searchString
    const s = document.createElement('div')
    s.style.fontSize = '24px'
    s.style.position = 'absolute'
    s.style.visibility = 'hidden'
    s.innerText = inputData.searchString
    document.body.appendChild(s)
    const pixelWidth = s.offsetWidth + 1
    document.body.removeChild(s)

    updateCursor(pixelWidth)
  })

  // keep this function at the bottom of this class
  params.callback(this)
}

export default { viewModel, template }
