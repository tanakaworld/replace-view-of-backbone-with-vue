const {mindMapDB} = require('../db');

module.exports = class MindMapNodesController {
    static index(req, res) {
        const {mindMapId} = req.params;
        const mindMap = mindMapDB.find(mindMapId);

        const mindMapNodes = mindMap.mindMapNodes.map((node) => {
            node['mindMapId'] = mindMapId;
            return node;
        });

        res.json({mindMapNodes});
    }

    static createOrUpdate(req, res) {
        const {mindMapId} = req.params;
        const {id, title, color, position} = req.body;

        mindMapDB.createOrUpdateNode(mindMapId, {id, title, color, position});

        res.json({mindMapId, id, title, color, position});
    }

    static destroy(req, res) {
        const {mindMapId, id} = req.params;
        mindMapDB.deleteMindMapNode(mindMapId, {id});

        res.status(204).end();
    }
};
