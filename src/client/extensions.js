import Backbone from 'backbone';

Backbone.View.prototype.close = function () {
    this.unbind();
    this.undelegateEvents();
};
