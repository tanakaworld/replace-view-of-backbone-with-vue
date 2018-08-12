import Backbone from "backbone";
import PageRenderer from "./pageRenderer";
import $ from "jquery";

import MindMapPage from "../views/mindMapPage";

export default Backbone.Router.extend({
    routes: {
        '(/)': 'mindMap',
        'mindMap(/)': 'mindMap'
    },

    initialize: function () {
        this.pageRenderer = new PageRenderer($('#app'));
        Backbone.history.start();
    },

    mindMap: function () {
        const page = new MindMapPage();
        this.pageRenderer.render(page);
    }
});
