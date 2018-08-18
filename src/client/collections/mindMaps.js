import Backbone from "backbone";
import MindMap from '../models/mindMap';

export default Backbone.Collection.extend({
    model: MindMap,

    url: '/api/mindMaps',

    processData: true,

    parse(data) {
        return data.mindMaps;
    }
});
