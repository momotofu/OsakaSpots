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

  //////////////////////////////////////////////////////////////////////////////
  // methods
  //////////////////////////////////////////////////////////////////////////////

  this.searchInputChange = (viewModel, event) => {
    event.preventDefault()
    const searchString = event.data

    // update visable listings with fuse results
    if (searchString && searchString.length >= 1) {
      // prevent listings flicker and extra work
      if (this.visableListings().length === 1) return

      this.fuse.list = this.visableListings() // narrow data sample on each query
      this.setVisableListings(this.fuse.search(event.data))

    } else {
      this.setVisableListings(this.listings())
    }

  this.searchInputEnter = (viewModel, event) => {
    event.preventDefault()
    const listings = viewModel.visableListings()

    if (listings.length > 0)
      this.selectedListing(listings[0])
  }

  }
}

export default { viewModel, template }
