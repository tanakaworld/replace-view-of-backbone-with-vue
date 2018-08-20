import Backbone from 'backbone';

import template from './template.hbs';
import MindMapTableRowView from './mind-map-table-row';
import $ from "jquery";

export default Backbone.View.extend({
    template,

    id: 'MindMapsPage',

    events: {
        'submit #MindMapForm': 'createMindMap'
    },

    initialize({mindMapsCollection}) {
        this.mindMapsCollection = mindMapsCollection;

        this.listenTo(this.mindMapsCollection, 'reset add update remove', this.render);
    },

    render() {
        this.$el.html(this.template({
            mindMaps: this.mindMapsCollection.toJSON()
        }));
        this.mindMapsCollection.each(model => this.renderMindMapRow(model));
    },

    renderMindMapRow(model) {
        const mindMapRowView = new MindMapTableRowView({model});
        $('.MindMapTable', this.$el).append(mindMapRowView.render().el);
    },

    createMindMap(e) {
        e.preventDefault();

        const $form = $(e.currentTarget);
        const {title} = $form.serializeAsObject();

        this.mindMapsCollection.create({title});
    }
});
