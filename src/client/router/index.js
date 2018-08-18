import Backbone from "backbone";
import PageRenderer from "./pageRenderer";
import $ from "jquery";

import MindMapsPage from "../views/mindMapsPage";
import MindMapPage from "../views/mindMapPage";
import MindMapsCollection from "../collections/mindMaps";

export default Backbone.Router.extend({
    routes: {
        '(/)': 'mindMaps',
        'mindMaps/:id(/)': 'mindMap'
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
    }
});
