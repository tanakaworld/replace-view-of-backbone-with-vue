import Backbone from 'backbone';

import template from './template.hbs';

export default Backbone.View.extend({
    template,

    events: {
        'click .MindMapTable__OpenLink': 'openMindMap',
        'click .MindMapTable__DeleteBtn': 'deleteMindMap'
    },

    tagName: 'tr',
    className: 'MindMapRow',

    initialize({model}) {
        this.model = model;
    },

    render() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    openMindMap(e) {
        e.preventDefault();

        Backbone.history.navigate(`/mindMaps/${this.model.get('id')}`, true);
    },

    deleteMindMap(e) {
        e.preventDefault();

        if (confirm(`Really Delete "${this.model.get('title')}"?`)) {
            console.log(this.model.attributes);
            this.model.destroy();
        }
    }
});
