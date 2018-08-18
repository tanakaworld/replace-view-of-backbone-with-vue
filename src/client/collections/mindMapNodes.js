import Backbone from "backbone";
import MindMapNode from '../models/mindMapNode';

export default Backbone.Collection.extend({
    model: MindMapNode,

    url() {
        return `/api/mindMaps/${this.mindMapId}/mindMapNodes`;
    },

    processData: true,

    parse(data) {
        return data.mindMapNodes;
    },

    initialize({mindMapId}) {
        Backbone.Collection.prototype.initialize.apply(this, arguments);

        if (!mindMapId) throw new Error('`mindMapId` is needed');
        this.mindMapId = mindMapId;
    }
});
