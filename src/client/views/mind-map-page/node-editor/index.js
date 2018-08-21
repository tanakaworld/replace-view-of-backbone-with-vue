import Backbone from "backbone";
import $ from 'jquery';

import template from './template.hbs';

export default Backbone.View.extend({
    template,

    events: {
        'submit .NodeEditor__Form': 'submit',
        'click .NodeEditor__DeleteBtn': 'deleteNode',
        'blur .NodeEditor__Title': 'save'
    },

    initialize({model, deleteNodeCallback}) {
        this.model = model;
        this.deleteNodeCallback = deleteNodeCallback;
    },

    render() {
        const {
            id,
            color,
            title
        } = this.model.attributes;

        this.$el.html(this.template({id, title}));

        setTimeout(() => {
            this.$form = $('.NodeEditor__Form');
            this.$colorPicker = $('.NodeEditor__ColorPicker');

            this.$colorPicker.spectrum({
                color,
                showButtons: false,
                change: () => this.save()
            });
        }, 100);
    },

    submit(e) {
        e.preventDefault();
        this.save();
    },

    save() {
        this.model.updateData(this.getFormInputs());
    },

    getFormInputs() {
        const {title} = this.$form.serializeAsObject();
        const color = this.$colorPicker.spectrum('get').toHexString();

        return {title, color};
    },

    deleteNode() {
        if (confirm(`Really Delete "${this.model.get('title')}"?`)) {
            this.deleteNodeCallback();
        }
    }
});
