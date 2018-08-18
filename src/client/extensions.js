import Backbone from 'backbone';
import $ from 'jquery';

Backbone.View.prototype.close = function () {
    this.unbind();
    this.undelegateEvents();
};

$.prototype.serializeAsObject = function () {
    return this.serializeArray().reduce((r, {name, value}) => {
        r[name] = value;
        return r;
    }, {});
};
