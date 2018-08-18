const RealmDB = require('./RealmDB');

const MindMapLinkSchema = {
    name: 'MindMapLink',
    primaryKey: 'id',
    properties: {
        id: 'string',
        from: 'string',
        to: 'string'
    }
};


class MindMapLinkDB extends RealmDB {
}

module.exports = {
    MindMapLinkSchema,
    MindMapLinkDB
};
