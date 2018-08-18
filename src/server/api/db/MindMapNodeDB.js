const RealmDB = require('./RealmDB');

const MindMapNodeSchema = {
    name: 'MindMapNode',
    primaryKey: 'id',
    properties: {
        id: 'string',
        title: 'string',
        color: 'string',
        x: 'int',
        y: 'int'
    }
};


class MindMapNodeDB extends RealmDB {
}

module.exports = {
    MindMapNodeSchema,
    MindMapNodeDB
};
