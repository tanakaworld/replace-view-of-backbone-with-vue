const Realm = require('realm');

const {MindMapSchema, MindMapDB} = require('./MindMapDB');
const {MindMapNodeSchema, MindMapNodeDB} = require('./MindMapNodeDB');
const {MindMapLinkSchema, MindMapLinkDB} = require('./MindMapLinkDB');

const realm = new Realm({
    schema: [
        MindMapSchema,
        MindMapNodeSchema,
        MindMapLinkSchema
    ]
});

module.exports = {
    mindMapDB: new MindMapDB(realm),
    mindMapNodeDB: new MindMapNodeDB(realm),
    mindMapLinkDB: new MindMapLinkDB(realm)
};
