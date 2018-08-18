const {mindMapDB} = require('../db');

module.exports = class MindMapLinksController {
    static index(req, res) {
        const {mindMapId} = req.params;
        const mindMap = mindMapDB.find(mindMapId);

        const mindMapLinks = mindMap.mindMapLinks.map((link) => {
            link['mindMapId'] = mindMapId;
            return link;
        });

        res.json({mindMapLinks});
    }

    static createOrUpdate(req, res) {
        const {mindMapId} = req.params;
        const {id, from, to} = req.body;

        mindMapDB.createOrUpdateLink(mindMapId, {id, from, to});

        res.json({mindMapId, id, from, to});
    }

    static destroy(req, res) {
        const {mindMapId, id} = req.params;
        mindMapDB.deleteMindMapLink(mindMapId, {id});

        res.status(204).end();
    }
};
