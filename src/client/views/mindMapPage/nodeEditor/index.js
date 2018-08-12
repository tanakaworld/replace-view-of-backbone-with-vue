import Backbone from "backbone";
import $ from 'jquery';

import template from './template.hbs';

export default Backbone.View.extend({
    template,

    events: {
        'submit .NodeEditor__Form': 'submit',
        'click .NodeEditor__DeleteBtn': 'deleteNode',
    },

    initialize({model, deleteNodeCallback}) {
        this.model = model;
        this.deleteNodeCallback = deleteNodeCallback;
    },

    render() {
        this.$el.html(this.template({
            id: this.model.get('id'),
            title: this.model.get('title'),
            color: this.model.get('color')
        }));
    },

    submit(e) {
        e.preventDefault();

        const $form = $(e.currentTarget);
        const {title, color} = $form.serializeArray().reduce((r, {name, value}) => {
            r[name] = value;
            return r;
        }, {});
        this.model.updateData({title, color});
    },

    deleteNode() {
        this.deleteNodeCallback();
    }
});
