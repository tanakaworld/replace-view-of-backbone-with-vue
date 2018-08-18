import Backbone from "backbone";
import MindMapLink from '../models/mindMapLink';

export default Backbone.Collection.extend({
    model: MindMapLink,

    url() {
        return `/api/mindMaps/${this.mindMapId}/mindMapLinks`;
    },

    processData: true,

    parse(data) {
        return data.mindMapLinks;
    },

    initialize({mindMapId}) {
        Backbone.Collection.prototype.initialize.apply(this, arguments);

        if (!mindMapId) throw new Error('`mindMapId` is needed');
        this.mindMapId = mindMapId;
    }
});
