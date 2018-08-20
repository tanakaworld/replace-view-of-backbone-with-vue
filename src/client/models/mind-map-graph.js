import joint from 'jointjs';

import MindMapNode from './mind-map-node';
import MindMapLink from './mind-map-link';

export default joint.dia.Graph.extend({
    makeNode({mindMapId, id, title, color, x, y}) {
        const element = new MindMapNode({
            mindMapId,
            id,
            title,
            color,
            position: {x, y},
            inPorts: ['in'],
            outPorts: ['out']
        });
        this.addCell(element);
        return element;
    },

    makeLink({mindMapId, id, sourceId, targetId}) {
        const link = new MindMapLink({
            mindMapId,
            id,
            source: {id: sourceId, port: 'out'},
            target: {id: targetId, port: 'in'}
        });
        this.addCell(link);
        return link;
    },

    deleteNodes(...nodes) {
        this.removeCells(nodes);
    }
});
