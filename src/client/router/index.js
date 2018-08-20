import Backbone from "backbone";
import PageRenderer from "./page-renderer";
import $ from "jquery";

import MindMapsPage from "../views/mind-maps-page";
import MindMapPage from "../views/mind-map-page";
import MindMapWithVuePage from "../views/mind-map-page-with-vue";
import MindMapsCollection from "../collections/mind-maps";

export default Backbone.Router.extend({
    routes: {
        '(/)': 'mindMaps',
        'mindMaps/:id(/)': 'mindMap',
        'mindMaps/vue/:id(/)': 'mindMapWithVue'
    },

    initialize: function () {
        this.pageRenderer = new PageRenderer($('#app'));
        this.mindMapsCollection = new MindMapsCollection();

        this.mindMapsCollection.fetch({
            success() {
                Backbone.history.start();
            },
            error() {
                alert('Loading error ...');
            }
        });
    },

    mindMaps: function () {
        const {mindMapsCollection} = this;
        const page = new MindMapsPage({mindMapsCollection});
        this.pageRenderer.render(page);
    },

    mindMap: function (id) {
        const mindMapModel = this.mindMapsCollection.get(id);
        if (!mindMapModel) {
            alert('Not Found Mind Map');
            return '';
        }

        const page = new MindMapPage({mindMapModel});
        this.pageRenderer.render(page);
    },

    mindMapWithVue: function (id) {
        const mindMapModel = this.mindMapsCollection.get(id);
        if (!mindMapModel) {
            alert('Not Found Mind Map');
            return '';
        }

        const page = new MindMapWithVuePage({mindMapModel});
        this.pageRenderer.render(page);
    }
});
