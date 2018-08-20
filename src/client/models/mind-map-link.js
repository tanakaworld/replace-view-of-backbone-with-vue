import joint from 'jointjs';
import _ from 'lodash';

export default joint.dia.Link.extend({
    urlRoot() {
        return `/api/mindMaps/${this.mindMapId}/mindMapLinks`;
    },

    defaults: _.defaultsDeep(joint.dia.Link.prototype.defaults, {
        router: {name: 'manhattan'}
    }),

    initialize({mindMapId, id, sourceId, targetId}) {
        joint.dia.Link.prototype.initialize.apply(this, arguments);

        if (!mindMapId) throw new Error('`mindMapId` is needed');
        this.mindMapId = mindMapId;
    }
});
