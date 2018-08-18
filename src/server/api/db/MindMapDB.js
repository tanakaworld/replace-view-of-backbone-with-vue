const RealmDB = require('./RealmDB');

const {MindMapNodeSchema} = require('./MindMapNodeDB');
const {MindMapLinkSchema} = require('./MindMapLinkDB');

const MindMapSchema = {
    name: 'MindMap',
    primaryKey: 'id',
    properties: {
        id: 'string',
        title: 'string',
        mindMapNodes: {
            type: 'list',
            objectType: MindMapNodeSchema.name
        },
        mindMapLinks: {
            type: 'list',
            objectType: MindMapLinkSchema.name
        }
    }
};

class MindMapDB extends RealmDB {
    all() {
        return this.realm.objects(MindMapSchema.name);
    }

    find(id) {
        return this.realm.objectForPrimaryKey(MindMapSchema.name, id);
    }

    create(id, {title}) {
        this.realm.write(() => {
            this.realm.create(MindMapSchema.name, {
                id,
                title
            }, true);
        });

        return {id, title};
    }

    update(id, {title}) {
        this.realm.write(() => {
            this.realm.create(MindMapSchema.name, {
                id, title
            }, true);
        });

        return {id, title};
    }

    delete(id) {
        const mindMap = this.find(id);
        this.realm.write(() => {
            this.realm.delete(mindMap);
        });
    }

    createOrUpdateNode(mindMapId, {id, title, color, position}) {
        const mindMap = this.find(mindMapId);
        const {x, y} = position;

        this.realm.write(() => {
            const data = {id, title, color, x, y};

            if (mindMap.mindMapNodes.some(n => n.id === id)) {
                // update
                this.realm.create(MindMapNodeSchema.name, data, true);
            } else {
                // add as new
                mindMap.mindMapNodes.push(data);
            }
        });
    }

    createOrUpdateLink(mindMapId, {id, from, to}) {
        const mindMap = this.find(mindMapId);

        this.realm.write(() => {
            const data = {id, from, to};

            if (mindMap.mindMapLinks.some(n => n.id === id)) {
                // update
                this.realm.create(MindMapLinkSchema.name, data, true);
            } else {
                // add as new
                mindMap.mindMapLinks.push(data);
            }
        });
    }

    deleteMindMapNode(mindMapId, {id}) {
        const mindMap = this.find(mindMapId);
        const mindMapNode = mindMap.mindMapNodes.find(node => node.id === id);
        if (!mindMapNode) return;

        this.realm.write(() => {
            this.realm.delete(mindMapNode);
        });
    }

    deleteMindMapLink(mindMapId, {id}) {
        const mindMap = this.find(mindMapId);
        const mindMapLink = mindMap.mindMapLinks.find(link => link.id === id);
        if (!mindMapLink) return;

        this.realm.write(() => {
            this.realm.delete(mindMapLink);
        });
    }
}

module.exports = {
    MindMapSchema,
    MindMapDB
};
