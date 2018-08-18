const shortid = require('shortid');
const {
    mindMapDB,
    mindMapNodeDB
} = require('../db/index');

module.exports = class MindMapNodesController {
    static index(req, res) {
        const allNodes = mindMapDB.all();

        res.json({
            mindMaps: Object.keys(allNodes).map((k) => {
                const {id, title} = allNodes[k];
                return {
                    id,
                    title
                };
            })
        });
    }

    static detail(req, res) {
        const {id} = req.params;
        const allNodes = mindMapNodeDB.all();

        res.json({
            id,
            mindMapNodes: Object.keys(allNodes).map(k => allNodes[k]),
            mindMapLinks: []
        });
    }

    static create(req, res) {
        const {title} = req.body;

        const id = shortid.generate();
        mindMapDB.create(id, {title});

        res.json({id, title});
    }

    static update(req, res) {
        const {id} = req.params;
        const {title} = req.body;
        mindMapDB.update(id, {title});

        res.json({id, title});
    }

    static destroy(req, res) {
        const {id} = req.params;
        mindMapDB.delete(id);

        res.status(204).end();
    }
};
