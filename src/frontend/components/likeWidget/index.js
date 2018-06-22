import * as ko from 'knockout'
import likeWidget from './likeWidget.pug'

const template = likeWidget()
const viewModel = function(params) {
    // Data: value is either null, 'like', or 'dislike'
    this.chosenValue = ko.observable(params.value);

    // Behaviors
    this.like = function() { this.chosenValue('like'); }.bind(this);
    this.dislike = function() { this.chosenValue('dislike'); }.bind(this);
}

export default { viewModel, template }
