import * as ko from 'knockout'

import listingSearchbar from './listingSearchbar'
import './styles'

const template = listingSearchbar()
const viewModel = function(params) {
  //////////////////////////////////////////////////////////////////////////////
  // constants
  //////////////////////////////////////////////////////////////////////////////

  this.searchInput = document.getElementById('searchInput')

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
      searchString: event.data,
      enterPressed: false
    })
  }


  this.searchInputEnter = (viewModel, event) => {
    event.preventDefault()
    this.inputData({
      searchString: event.data,
      enterPressed: true
    })

  }

  // keep this function at the bottom of this class
  params.callback(this)
}

export default { viewModel, template }
