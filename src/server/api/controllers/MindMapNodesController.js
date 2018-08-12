module.exports = class MindMapNodesController {
    static index(req, res) {
        res.json({
            nodes: [
                {id: 1, title: 'A', color: 'red'},
                {id: 2, title: 'B', color: 'blue'},
                {id: 3, title: 'C', color: 'yellow'}
            ]
        });
    }

    static show(req, res) {
        res.json({id: 1, title: 'A', color: 'red'});
    }

    static create(req, res) {
        res.json({id: 1, title: 'A', color: 'red'});
    }

    static update(req, res) {
        res.json({id: 1, title: 'A', color: 'red'});
    }

    static destroy(req, res) {
        res.status(204);
    }
};
